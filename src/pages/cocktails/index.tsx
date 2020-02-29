import React from "react";
import PropTypes from "prop-types";
import Navigation from "../../modules/Navigation";
import cocktails, { Cocktail } from "./cocktails";
import styles from "./styles.module.scss";

const Cocktails = (): JSX.Element => {
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

Cocktails.propTypes = {
    errorCode: PropTypes.number.isRequired
};

const MenuItem = ({ name, ingredients, description, link }: Cocktail): JSX.Element => {
    return (
        <div>
            <h2 className={ styles.name }>
                <a className={ styles.title } href={ link } target="_blank" rel="noopener noreferrer">{ name }</a>
            </h2>
            <p className={ styles.ingredients }>{ ingredients.join(", ") }</p>
            { description && <p>{ description }</p> }
        </div>
    );
};

export default Cocktails;
