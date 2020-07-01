import React, { useState, useEffect } from "react";
import Navigation from "../../../modules/Navigation";
import styles from "./styles.module.scss";
import { API_URL } from "../../../constants/ExternalUrls";
import fetchFromCache from "../../../utils/cache";

const CARD_TTL = 604800000; // 1 week

interface RecipeRouterProps {
    match: {
        params: {
            deckName: string;
        };
    };
}

interface Card {
    count: number;
    card_digest: {
        name: string;
        image: string;
        id: string;
    };
}

interface MTGDeck {
    entries: {
        mainboard?: Card[];
        commanders?: Card[];
        oathbreakers?: Card[];
        nonlands?: Card[];
        lands?: Card[];
        sideboard?: Card[];
    }
}

interface FormattedDeck {
    entries: {
        featured: Card[];
        mainboard: Card[];
        sideboard: Card[];
    }
}

function massageDeck(data: MTGDeck): FormattedDeck {
    return {
        entries: {
            featured: ([] as Card[]).concat(
                data.entries.commanders || [],
                data.entries.oathbreakers || [],
            ),
            mainboard: ([] as Card[]).concat(
                data.entries.mainboard || [],
                data.entries.nonlands || [],
                data.entries.lands || []
            ),
            sideboard: data.entries.sideboard || []
        }
    };

    return data as FormattedDeck;
}

const Deck = (props: RecipeRouterProps): JSX.Element => {
    const {
        deckName
    } = props.match.params;

    const [ loaded, setLoaded ] = useState(false);
    const [ deck, setDeck ] = useState(null as unknown as FormattedDeck);

    useEffect(() => {
        fetchFromCache(`${ API_URL }/api/mtg/${ deckName }`)
            .then((data: JSON) => {
                const deck = massageDeck(data as unknown as MTGDeck);
                setLoaded(true);
                setDeck(deck);
            });
    }, [ deckName ]);


    if (!loaded) {
        return (
            <Navigation isHomepage={ false }>
                <div></div>
            </Navigation>
        );
    }

    if (!deck) {
        return (
            <Navigation isHomepage={ false }>
                <div>This isn&apos;t a valid deck</div>
            </Navigation>
        );
    }

    const maindeckType = deck.entries.mainboard.length <= 60
        ? "constructed"
        : "commander";

    return (
        <Navigation isHomepage={ false }>
            <div className={ styles.playmat }>
                <div className={ styles.deck }>
                    {
                        deck.entries.mainboard.map(({ count, card_digest: cardDigest }) => {
                            const output = [];

                            if (!cardDigest) {
                                return [];
                            }

                            for (let i = 0; i < count; ++i) {
                                output.push(<CardComponent key={ `${ cardDigest.name }-${ i }` } { ...cardDigest } type={ maindeckType } />);
                            }

                            return output;
                        }).flat()
                    }
                    <div className={ styles.overlay }></div>
                </div>
                <div className={ styles.sideboard }>
                    {
                        deck.entries.sideboard.map(({ count, card_digest: cardDigest }) => {
                            const output = [];

                            if (!cardDigest) {
                                return [];
                            }

                            for (let i = 0; i < count; ++i) {
                                output.push(<CardComponent key={ `${ cardDigest.name }-${ i }` } { ...cardDigest } type="sideboard" />);
                            }

                            return output;
                        }).flat()
                    }
                    <div className={ styles.overlay }></div>
                </div>
            </div>
        </Navigation>
    );
};

interface CardComponentProps {
    name: string;
    image?: string;
    id: string;
    type?: "constructed" | "commander" | "sideboard";
}

interface RelatedCard {
    id: string;
    name: string;
    component: string;
}

interface Faces {
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    flavor_test?: string;
    image_uris?: {
        border_crop: string;
    };
}

interface CardInfo {
    id: string;
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    flavor_text?: string;
    image_uris?: {
        border_crop: string;
    };
    card_faces?: Faces[];
    all_parts?: RelatedCard[];
    backFace?: Faces;
}

const FetchAndRenderCard: React.FunctionComponent<CardComponentProps> = ({ name, id }) => {
    const [ imageUrl, setImageUrl ] = useState(null as unknown as string);

    useEffect(() => {
        fetchFromCache(`https://api.scryfall.com/cards/${ id }`, CARD_TTL)
            .then((data: JSON) => {
                const cardInfo = data as unknown as CardInfo;
                setImageUrl(cardInfo.image_uris && cardInfo.image_uris.border_crop || null as unknown as string);
                console.log(cardInfo);
            });
    });

    if (!imageUrl) {
        return null;
    }

    return <img className={ styles.tooltipCard } src={ imageUrl } alt={ name } />;
};

function fillInMissingData(data: CardInfo) {
    // Palace Jailer doesn't link to the monarch card
    if (data.id === "78cef262-c753-4658-b3ec-fec8db47f944") {
        return {
            ...data,
            // eslint-disable-next-line @typescript-eslint/camelcase
            all_parts: [{
                id: "40b79918-22a7-4fff-82a6-8ebfe6e87185",
                name: "The Monarch",
                component: "token"
            }]
        };
    }

    if (data.card_faces) {
        const castable = data.card_faces.filter(({ mana_cost: manaCost }) => manaCost);

        const frontFace = castable[0];
        const backFace = castable.length > 1
            ? castable[1] :
            data.card_faces.filter(({ mana_cost: manaCost }) => !manaCost)[0];

        return {
            ...data,
            name: frontFace.name,
            // eslint-disable-next-line @typescript-eslint/camelcase
            mana_cost: frontFace.mana_cost,
            // eslint-disable-next-line @typescript-eslint/camelcase
            type_line: frontFace.type_line,
            // eslint-disable-next-line @typescript-eslint/camelcase
            oracle_text: frontFace.oracle_text,
            backFace
        };
    }

    return data;
}

function filterAllParts({ id: cardId, all_parts: allParts }: CardInfo): RelatedCard[] {
    if (!allParts) {
        return [];
    }

    return allParts.filter(({ id, component }: RelatedCard) => {
        if (cardId === id) {
            return false;
        }

        return component === "token";
    });
}

const Tooltip: React.FunctionComponent<CardInfo> = ({ name, mana_cost, type_line, oracle_text, flavor_text }) => {
    return (
        <div className={ styles.tooltip }>
            <p>{ name } <span className={ styles.manaCost }>{ mana_cost }</span></p>
            <p>{ type_line }</p>
            <p className={ styles.oracleText }>{ oracle_text }</p>
            { flavor_text && <p className={ styles.flavorText }>{ flavor_text }</p> }
        </div>
    );
};

const MAX_TOOLTIP_WIDTH = 860;

const CardComponent: React.FunctionComponent<CardComponentProps> = ({ name, image, id, type }) => {
    const [ tooltip, setTooltip ] = useState(null as unknown as CardInfo);

    const fetchTooltip = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        fetchFromCache(`https://api.scryfall.com/cards/${ id }`, CARD_TTL)
            .then((data: JSON) => {
                const cardInfo = data as unknown as CardInfo;
                setTooltip(fillInMissingData(cardInfo));
            });
    };

    const side = type === "sideboard" ? "left" : "right";
    
    return (
        <div className={ styles.cardContainer } onMouseOver={ fetchTooltip }>
            <img className={ styles.card } src={ image?.replace("large", "border_crop") } alt={ name } />
            { tooltip && (
                <div className={ `${ styles.tooltipContainer } ${ styles[side] }` }>
                    <Tooltip { ...tooltip }/>
                    { tooltip.backFace && (
                        <React.Fragment key={ tooltip.backFace.name }>
                            { tooltip.backFace.image_uris && <img className={ styles.tooltipCard } src={ tooltip.backFace.image_uris.border_crop } alt={ tooltip.backFace.name } /> }
                            <Tooltip id={ tooltip.backFace.name } { ...tooltip.backFace } />
                        </React.Fragment>
                    ) }
                    { tooltip.all_parts && filterAllParts(tooltip).map((card) => <FetchAndRenderCard key={ card.id } { ...card } />) }
                </div>
            ) }
        </div>
    );
};

export default Deck;
