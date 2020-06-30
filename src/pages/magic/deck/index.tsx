import React, { useState, useEffect } from "react";
import Navigation from "../../../modules/Navigation";
import styles from "./styles.module.scss";
import { API_URL } from "../../../constants/ExternalUrls";
import fetchFromCache from "../../../utils/cache";

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
        mainboard: Card[];
    }
}

const Deck = (props: RecipeRouterProps): JSX.Element => {
    const {
        deckName
    } = props.match.params;

    const [ loaded, setLoaded ] = useState(false);
    const [ deck, setDeck ] = useState(null as unknown as MTGDeck);

    useEffect(() => {
        fetchFromCache(`${ API_URL }/api/mtg/${ deckName }`)
            .then((data: JSON) => {
                setLoaded(true);
                setDeck(data as unknown as MTGDeck);
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

    return (
        <Navigation isHomepage={ false }>
            <div className={ styles.deck }>
                {
                    deck.entries.mainboard.map(({ count, card_digest: cardDigest }) => {
                        const output = [];

                        for (let i = 0; i < count; ++i) {
                            output.push(<CardComponent key={ `${ cardDigest.name }-${ i }` } { ...cardDigest } />);
                        }

                        return output;
                    }).flat()
                }
            </div>
        </Navigation>
    );
};

interface CardComponentProps {
    name: string;
    image: string;
    id: string;
}

interface CardInfo {
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    flavor_text?: string;
}

const CardComponent: React.FunctionComponent<CardComponentProps> = ({ name, image, id }) => {
    const [ tooltip, setTooltip ] = useState(null as unknown as CardInfo);
    const imageUrl = image.replace("large", "border_crop");

    const fetchTooltip = () => {
        fetchFromCache(`https://api.scryfall.com/cards/${ id }`)
            .then((data: JSON) => {
                setTooltip(data as unknown as CardInfo);
            });
    };
    
    return (
        <div className={ styles.cardContainer } onMouseOver={ fetchTooltip }>
            <img className={ styles.card } src={ imageUrl } alt={ name } />
            { tooltip && (
                <div className={ styles.tooltip }>
                    <p>{ tooltip.name } <span className={ styles.manaCost }>{ tooltip.mana_cost }</span></p>
                    <p>{ tooltip.type_line }</p>
                    <p>{ tooltip.oracle_text }</p>
                    { tooltip.flavor_text && <p className={ styles.flavorText }>{ tooltip.flavor_text }</p> }
                </div>
            ) }
        </div>
    );
};

export default Deck;
