import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import styles from "./styles.module.scss";

const Magic: FunctionComponent = () => {
    return (
        <Navigation>
            <div className={ styles.content }>
                <h1 className={ styles.heading }>
                    My Magic: the Gathering decks
                </h1>
                <div className={ styles.decks }>
                    <div>
                        <h2>Pioneer</h2>
                        <ul>
                            <DeckLink name="Lotus Field Combo" id="lotus-field-combo" colors="⚪🔵⚫🔴🟢" />
                            <DeckLink name="5-Color Humans" id="pyre-of-humans" colors="⚪🔵⚫🔴🟢" />
                        </ul>
                    </div>
                    <div>
                        <h2>Modern</h2>
                        <ul>
                            <DeckLink name="Amulet Titan" id="amulet-titan" colors="🟢" />
                            <DeckLink name="Bogles" id="bogles" colors="⚪🟢" />
                            <DeckLink name="Eldrazi Tron" id="eldrazi-tron" colors="" />
                            <DeckLink name="Merfolk" id="merfolk" colors="🔵" />
                            <DeckLink name="Gifts Storm" id="gifts-storm" colors="🔵🔴" />
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
                            <DeckLink name="Death &amp; Taxes" id="death-and-taxes" colors="⚪" />
                            <DeckLink name="Enchantress" id="enchantress" colors="⚪⚫🟢" />
                            <DeckLink name="Lands" id="lands" colors="🔴🟢" />
                            <DeckLink name="Manaless Dredge" id="manaless-dredge" colors="🔵⚫🔴🟢" />
                            <DeckLink name="Miracles" id="miracles" colors="⚪🔵🟢" />
                            <DeckLink name="Omnitell" id="omnitell" colors="🔵" />
                            <DeckLink name="Painter" id="strawberry-shortcake" colors="⚪🔴" />
                            <DeckLink name="Reanimator" id="reanimator" colors="⚪⚫🔴" />
                            <DeckLink name="Storm" id="storm" colors="🔵⚫🔴" />
                            <DeckLink name="Izzet Delver" id="izzet-delver" colors="🔵🔴" />
                        </ul>
                    </div>
                    <div>
                        <h2>Pauper</h2>
                        <ul>
                            <DeckLink name="Mono-Green Land Destruction" id="mono-g-ponza" colors="🟢" />
                            <DeckLink name="Tortured Existance" id="tortured-existance" colors="⚪⚫🟢" />
                        </ul>
                    </div>
                    <div>
                        <h2>Commander</h2>
                        <ul>
                            <DeckLink name="Karador" id="karador" colors="⚪⚫🟢" />
                            <DeckLink name="Muldrotha" id="muldrotha" colors="🔵⚫🟢" />
                            <DeckLink name="Nahiri" id="nahiri" colors="⚪" />
                            <DeckLink name="Sasaya" id="sasaya" colors="🟢" />
                            <DeckLink name="Sen Triplets" id="sen-triplets" colors="⚪🔵⚫" />
                            <DeckLink name="Zedruu" id="zedruu" colors="⚪🔵🔴" />
                            <DeckLink name="Zur" id="zur" colors="⚪🔵⚫" />
                        </ul>
                    </div>
                    <div>
                        <h2>Other</h2>
                        <ul>
                            <DeckLink name="Pre-Modern: Astral Slide" id="astral-slide" colors="⚪🔴" />
                            <DeckLink name="Oathbreaker: Wrenn &amp; Six" id="wrenn-and-six" colors="🔴🟢" />
                            <DeckLink name="Proxy Vintage: Oath of Druids" id="oath-of-druids" colors="⚪🔵⚫🔴🟢" />
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
    colors?: string;
}

const DeckLink: React.FunctionComponent<DeckLinkProps> = ({ name, id, colors }) => {

    return (
        <Link to={ `/magic/deck/${ id }` }>
            <li className={ styles.deck }><h2>{ name }</h2>{ colors && <span className={ styles.deckColors }>{ colors }</span> }</li>
        </Link>
    );
};

export default Magic;
