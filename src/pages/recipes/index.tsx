import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import recipes, { Recipe } from "./recipes";
import styles from "./recipe/styles.module.scss";

const RecipesPage = (): JSX.Element => {
    return (
        <Navigation>
            <div className={ styles.recipe }>
                <div className={ styles.menu }>
                    <h1>Recipe Book</h1>
                    <span>Some of my favorite recipes. List and format is currently being revised</span>
                </div>
                { Object.keys(recipes).map((recipeId) => <MenuItem key={ recipeId } { ...recipes[recipeId] } />) }
            </div>
        </Navigation>
    );
};

const MenuItem = ({ name, id }: Recipe): JSX.Element => {
    return (
        <div>
            <h2 className={ styles.name }>
                <Link linkStyle={ styles.title } to={ `/recipe/${ id }` }>{ name }</Link>
            </h2>
        </div>
    );
};

export default RecipesPage;
