import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import styles from "./styles.module.scss";

const cards = {
    "mox_diamond": "https://img.scryfall.com/cards/art_crop/front/b/f/bf9fecfd-d122-422f-bd0a-5bf69b434dfe.jpg?1562431287"
};

const Magic = (): JSX.Element => {
    return (
        <Navigation>
            <div className={ styles.content }>
                <div>
                    <h1>Modern</h1>
                    <ul>
                        <DeckLink name="Amulet Titan" id="amulet-titan" />
                    </ul>
                </div>
                <div>
                    <h1>Pauper</h1>
                    <ul>
                        <DeckLink name="Tortured Existance" id="tortured-existance" />
                    </ul>
                </div>
                <div>
                    <h1>Legacy</h1>
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
                    <h1>Commander</h1>
                    <li className={ styles.deck }><h2>Muldrotha</h2></li>
                    <li className={ styles.deck }><h2>Sen Triplets</h2></li>
                    <li className={ styles.deck }><h2>Zedruu</h2></li>
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
