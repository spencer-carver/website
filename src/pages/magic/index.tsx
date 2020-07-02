import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import styles from "./styles.module.scss";

const Magic = (): JSX.Element => {
    return (
        <Navigation>
            <div className={ styles.content }>
                <h1 className={ styles.heading }>
                    My Magic: the Gathering decks
                </h1>
                <div className={ styles.decks }>
                    <div>
                        <h2>Modern</h2>
                        <ul>
                            <DeckLink name="Amulet Titan" id="amulet-titan" />
                            <DeckLink name="Eldrazi Tron" id="eldrazi-tron" />
                        </ul>
                    </div>
                    <div>
                        <h2>Legacy</h2>
                        <p>
                            I have a Legacy Battlebox with 10 decks designed to play against each other.
                            Each deck is playable in a general Legacy metagame, but will not be the most
                            up-to-date or tuned.
                        </p>
                        <ul>
                            <DeckLink name="Lands" id="lands" />
                            <DeckLink name="Death &amp; Taxes" id="death-and-taxes" />
                            <DeckLink name="Miracles" id="miracles" />
                            <DeckLink name="Omnitell" id="omnitell" />
                            <DeckLink name="Painter" id="strawberry-shortcake" />
                            <DeckLink name="Reanimator" id="reanimator" />
                            <DeckLink name="Manaless Dredge" id="manaless-dredge" />
                            <DeckLink name="Temur Delver" id="rug-delver" />
                            <DeckLink name="Storm" id="storm" />
                            <DeckLink name="Enchantress" id="enchantress" />
                        </ul>
                    </div>
                    <div>
                        <h2>Commander</h2>
                        <ul>
                            <DeckLink name="Sasaya" id="sasaya" />
                            <DeckLink name="Muldrotha" id="muldrotha" />
                        </ul>
                    </div>
                    <div>
                        <h2>Other</h2>
                        <ul>
                            <DeckLink name="Pauper: Tortured Existance" id="tortured-existance" />
                            <DeckLink name="Pioneer: UW Control" id="uw-control" />
                            <DeckLink name="Oathbreaker: Wrenn &amp; Six" id="wrenn-and-six" />
                        </ul>
                    </div>
                </div>
            </div>
        </Navigation>
    );
};

interface DeckLinkProps {
    name: string;
    id: string;
}

const DeckLink: React.FunctionComponent<DeckLinkProps> = ({ name, id }) => {

    return (
        <Link to={ `/magic/deck/${ id }` }>
            <li className={ styles.deck }><h2>{ name }</h2></li>
        </Link>
    );
};

export default Magic;
