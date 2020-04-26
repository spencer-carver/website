import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import { RecipeList, RecipeListDetails, RecipeListKey } from "../../@types/recipes";
import { API_URL } from "../../constants/ExternalUrls";
import fetchFromCache from "../../utils/cache";
import styles from "./recipe/styles.module.scss";

const RecipesPage = (): JSX.Element => {
    const [ loaded, setLoaded ] = useState(false);
    const [ recipeList, setRecipeList ] = useState({} as unknown as RecipeList);

    useEffect(() => {
        fetchFromCache(`${ API_URL }/api/recipes`)
            .then((data: JSON) => {
                setLoaded(true);
                setRecipeList(data as unknown as RecipeList);
            });
    }, []);

    if (!loaded) {
        return (
            <Navigation isHomepage={ false }>
                <div></div>
            </Navigation>
        );
    }

    return (
        <Navigation>
            <div className={ styles.recipe }>
                <div className={ styles.menu }>
                    <h1>Recipe Book</h1>
                    <span>Some of my favorite recipes. List and format is currently being revised</span>
                </div>
                {
                    Object.keys(recipeList).map((section: string): JSX.Element | null => {
                        const recipes = recipeList[section as RecipeListKey];

                        if (recipes.length === 0) {
                            return null;
                        }
                        
                        return (
                            <div key={ section }>
                                <h3 className={ `${ styles.section } ${ styles.header }` }>{ section }s</h3>
                                { recipes.map((recipe: RecipeListDetails) => <MenuItem key={ recipe.id } { ...recipe } />) }
                            </div>
                        );
                    })
                }
            </div>
        </Navigation>
    );
};

const MenuItem = ({ name, id }: RecipeListDetails): JSX.Element => {
    return (
        <div>
            <h2 className={ styles.name }>
                <Link className={ styles.title } to={ `/recipe/${ id }` }>{ name }</Link>
            </h2>
        </div>
    );
};

export default RecipesPage;
