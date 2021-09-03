/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, FunctionComponent } from "react";
import Navigation from "../../../modules/Navigation";
import styles from "./styles.module.scss";
import { API_URL } from "../../../constants/ExternalUrls";
import fetchFromCache from "../../../utils/cache";

const CARD_TTL = 604800000; // 1 week

interface DeckRouterProps {
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
    name: string;
    description?: string;
    entries: {
        mainboard?: Card[];
        commanders?: Card[];
        oathbreakers?: Card[];
        nonlands?: Card[];
        lands?: Card[];
        sideboard?: Card[];
    };
}

interface FormattedDeck {
    name: string;
    description?: string;
    type: "commander" | "oathbreaker" | "constructed";
    entries: {
        featured: Card[];
        mainboard: Card[];
        sideboard: Card[];
    };
}

function massageList(data?: Card[]): Card[] {
    if (!data) {
        return [];
    }

    return data.map((card) => {
        const output = [];

        if (!card.card_digest) {
            return [];
        }

        for (let i = 0; i < card.count; ++i) {
            
            output.push({ count: 1, card_digest: card.card_digest });
        }

        return output;
    }).reduce((acc, arrEl) => {
        return acc.concat(arrEl);
    }, []);
}

function massageDeck(data: MTGDeck): FormattedDeck {
    const type = data.entries.commanders
        ? "commander"
        : data.entries.oathbreakers
            ? "oathbreaker"
            : "constructed";

    return {
        name: data.name,
        description: data.description,
        type,
        entries: {
            featured: ([] as Card[]).concat(
                massageList(data.entries.commanders),
                massageList(data.entries.oathbreakers),
            ),
            mainboard: ([] as Card[]).concat(
                massageList(data.entries.mainboard),
                massageList(data.entries.nonlands),
                massageList(data.entries.lands)
            ),
            sideboard: massageList(data.entries.sideboard)
        }
    };
}

const Deck: FunctionComponent<DeckRouterProps> = (props) => {
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
            <Navigation isLoading={ true }>
                <div></div>
            </Navigation>
        );
    }

    if (!deck) {
        return (
            <Navigation>
                <div>This isn&apos;t a valid deck</div>
            </Navigation>
        );
    }

    const isYorion = deck.entries.mainboard.length === 80;

    return (
        <Navigation>
            <div className={ styles.content }>
                <div className={ styles.table }>
                    <div className={ styles.playmat }>
                        <div className={ `${ styles.featured } ${ styles[deck.type] }` }>
                            {
                                deck.entries.featured.map(({ card_digest: cardDigest }, i) => {
                                    return <CardComponent key={ `${ cardDigest.name }-${ i }` } { ...cardDigest } index={ i } type="featured" />;
                                })
                            }
                        </div>
                        <div className={ styles.description }>{ deck.description }</div>
                        <div className={ `${ styles.deck } ${ styles[deck.type] } ${ isYorion ? styles.yorion : "" }` }>
                            {
                                deck.entries.mainboard.map(({ card_digest: cardDigest }, i) => {
                                    return <CardComponent key={ `${ cardDigest.name }-${ i }` } { ...cardDigest } index={ i } type={ deck.type } />;
                                })
                            }
                            <div className={ styles.overlay }></div>
                        </div>
                        <div className={ `${ styles.sideboard } ${ styles[deck.type] }` }>
                            {
                                deck.entries.sideboard.map(({ card_digest: cardDigest }, i) => {
                                    return <CardComponent key={ `${ cardDigest.name }-${ i }` } { ...cardDigest } index={ i } type="sideboard" />;
                                })
                            }
                            <div className={ styles.overlay }></div>
                        </div>
                    </div>
                </div>
                <div className={ styles.howToPlay }>
                    Coming soon: How To Play this deck
                </div>
                { deck.type === "constructed" && (
                    <div className={ styles.sideboardingGuide }>
                        Coming Soon: Sideboarding guide for this deck
                    </div>
                ) }
            </div>
        </Navigation>
    );
};

interface CardComponentProps {
    name: string;
    image?: string;
    id: string;
    type?: "constructed" | "commander" | "oathbreaker" | "sideboard" | "featured";
    index: number;
}

interface RelatedCard {
    id: string;
    name: string;
    component: string;
    type_line: string;
}

interface Faces {
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    flavor_text?: string;
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
                setImageUrl(cardInfo.image_uris ? cardInfo.image_uris.border_crop : null as unknown as string);
            });
    });

    if (!imageUrl) {
        return null;
    }

    return <img className={ styles.tooltipCard } src={ imageUrl } alt={ name } />;
};

function fillInMissingData(data: CardInfo): CardInfo {
    // Palace Jailer doesn't link to the monarch card
    if (data.id === "78cef262-c753-4658-b3ec-fec8db47f944") {
        return {
            ...data,
            
            all_parts: [{
                id: "40b79918-22a7-4fff-82a6-8ebfe6e87185",
                name: "The Monarch",
                component: "token",
                type_line: "Card"
            }]
        };
    }

    // Forbidden Orchard (CHK) doesn't link to the MPR spirit token
    if (data.id === "88d78261-c8c9-4e0e-b157-f70ed46c3a25") {
        return {
            ...data,
            all_parts: [{
                id: "46b60d95-b9bc-40f8-b986-bfa8e3eb74f3",
                name: "Spirit",
                component: "token",
                type_line: "Token Creature - Spirit"
            }]
        };
    }

    if (data.card_faces) {
        const castable = data.card_faces.filter(({ mana_cost: manaCost }) => manaCost);
        let frontFace;
        let backFace;

        if (castable.length === 0) {
            // it's a land (e.g. Westvale Abbey)

            frontFace = data.card_faces[0];
            backFace = data.card_faces[1];
        } else {
            frontFace = castable[0];
            backFace = castable.length > 1
                ? castable[1] :
                data.card_faces.filter(({ mana_cost: manaCost }) => !manaCost)[0];
        }

        return {
            ...data,
            name: frontFace.name,
            mana_cost: frontFace.mana_cost,
            type_line: frontFace.type_line,
            oracle_text: frontFace.oracle_text,
            flavor_text: frontFace.flavor_text,
            backFace
        };
    }

    return data;
}

function filterAllParts({ id: cardId, all_parts: allParts }: CardInfo): RelatedCard[] {
    if (!allParts) {
        return [];
    }

    
    return allParts.filter(({ id, component, type_line }: RelatedCard) => {
        if (cardId === id) {
            return false;
        }

        
        if (type_line.indexOf("Emblem") !== -1) {
            return true;
        }

        return component === "token";
    });
}

const Tooltip: React.FunctionComponent<CardInfo> = ({ name, mana_cost, type_line, oracle_text, flavor_text, backFace }) => {
    return (
        <div>
            <div className={ styles.tooltip }>
                <p>{ name } <span className={ styles.manaCost }>{ mana_cost }</span></p>
                <p>{ type_line }</p>
                <p className={ styles.oracleText }>{ oracle_text }</p>
                { flavor_text && <p className={ styles.flavorText }>{ flavor_text }</p> }
            </div>
            { backFace && !backFace.image_uris && <Tooltip id={ backFace.name } { ...backFace } /> }
        </div>
    );
};

const CardComponent: React.FunctionComponent<CardComponentProps> = ({ name, image, id, type, index }) => {
    const [ tooltip, setTooltip ] = useState(null as unknown as CardInfo);

    const fetchTooltip = (): void => {
        fetchFromCache(`https://api.scryfall.com/cards/${ id }`, CARD_TTL)
            .then((data: JSON) => {
                const cardInfo = data as unknown as CardInfo;
                setTooltip(fillInMissingData(cardInfo));
            });
    };

    const side = type === "sideboard" || (type === "constructed" && index >= 45) || (type === "commander" && index >= 50) || (type === "oathbreaker" && index >= 30)
        ? "left"
        : "right";

    if (type === "featured") {
        !tooltip && fetchTooltip();

        return (
            <div className={ styles.featuredCard }>
                <img className={ styles.card } src={ image?.replace("large", "border_crop") } alt={ name } />
                { tooltip && (
                    <div className={ `${ styles.tooltipContainer } ${ styles[side] }` }>
                        <div className={ styles.frontFace }>
                            <Tooltip { ...tooltip }/>
                        </div>
                        { tooltip.backFace && tooltip.backFace.image_uris && (
                            <div key={ tooltip.backFace.name } className={ styles.backFace }>
                                <div>
                                    <img className={ styles.tooltipCard }
                                        src={ tooltip.backFace.image_uris.border_crop }
                                        alt={ tooltip.backFace.name } />
                                </div>
                                <Tooltip id={ tooltip.backFace.name } { ...tooltip.backFace } />
                            </div>
                        ) }
                    </div>
                ) }
            </div>
        );
    }
    
    return (
        <div className={ styles.cardContainer } onMouseOver={ fetchTooltip } onFocus={ fetchTooltip }>
            <img className={ styles.card } src={ image?.replace("large", "border_crop") } alt={ name } />
            { tooltip && (
                <div className={ `${ styles.tooltipContainer } ${ styles[side] }` }>
                    <div className={ styles.frontFace }>
                        <div className={ styles.cardSpacer } />
                        <Tooltip { ...tooltip }/>
                        { tooltip.all_parts && filterAllParts(tooltip).map((card) => <FetchAndRenderCard key={ card.id } index={ 0 } { ...card } />) }
                    </div>
                    { tooltip.backFace && tooltip.backFace.image_uris && (
                        <div key={ tooltip.backFace.name } className={ styles.backFace }>
                            <div>
                                <img className={ styles.tooltipCard } src={ tooltip.backFace.image_uris.border_crop } alt={ tooltip.backFace.name } />
                            </div>
                            <Tooltip id={ tooltip.backFace.name } { ...tooltip.backFace } />
                            { tooltip.all_parts && filterAllParts(tooltip).map((_, i) => <div key={ i } className={ styles.cardSpacer } />) }
                        </div>
                    ) }
                </div>
            ) }
        </div>
    );
};

export default Deck;
