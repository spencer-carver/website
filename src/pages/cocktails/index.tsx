import React, { FunctionComponent } from "react";
import Link from "../../components/link";
import Navigation from "../../modules/Navigation";
import cocktails, { Cocktail } from "./cocktails";
import styles from "./styles.module.scss";

const Cocktails: FunctionComponent = () => {
    return (
        <Navigation>
            <div className={ styles.content }>
                <div className={ styles.menu }>
                    <h1>Cocktail Menu</h1>
                    <span>Some of my favorite cocktails. List and format is currently being revised</span>
                    {
                        cocktails.map((drink, index) => {
                            return <MenuItem key={ index } { ...drink } />;
                        })
                    }
                </div>
            </div>
        </Navigation>
    );
};

const MenuItem: FunctionComponent<Cocktail> = ({ name, ingredients, description, link }) => {
    return (
        <div>
            <h2 className={ styles.name }>
                <Link linkStyle={ styles.title } to={ link }>{ name }</Link>
            </h2>
            <p className={ styles.ingredients }>{ ingredients.join(", ") }</p>
            { description && <p>{ description }</p> }
        </div>
    );
};

export default Cocktails;
