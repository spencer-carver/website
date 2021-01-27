import "react-app-polyfill/ie11";
import React, { useState, FunctionComponent } from "react";
import { render } from "react-snapshot";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Footer from "./modules/Footer";
import Homepage from "./pages/homepage";
import Puzzles from "./pages/puzzles";
import Puzzle from "./pages/puzzles/puzzle";
import Cocktails from "./pages/cocktails";
import Recipes from "./pages/recipes";
import Recipe from "./pages/recipes/recipe";
import Magic from "./pages/magic";
import MagicDeck from "./pages/magic/deck";
import Error from "./pages/error";
import { unregister as unregisterServiceWorker } from "./registerServiceWorker";
import "./index.scss";

const getDefaultTheme = (): string => {
    let theme;

    try {
        theme = localStorage.getItem("theme");
    } catch (e) {
        // do nothing
    }

    return theme || "light";
};

const Sitemap: FunctionComponent = () => {
    const [ theme, setTheme ] = useState(getDefaultTheme());

    const saveTheme = (theme: string): void => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
    };
    
    return (
        <Router>
            <main className="page" data-theme={ theme }>
                <Switch>
                    <Route path="/" exact component={ Homepage } />
                    <Redirect from="/puzzle" exact to="/puzzles" />
                    <Route path="/puzzles" exact component={ Puzzles } />
                    <Route path="/puzzle/:puzzleName" exact component={ Puzzle } />
                    <Redirect from="/cocktail" exact to="/cocktails" />
                    <Route path="/cocktails" exact component={ Cocktails } />
                    <Redirect from="/recipe" exact to="/recipes" />
                    <Route path="/recipes" exact component={ Recipes } />
                    <Route path="/recipe/:recipeName" exact component={ Recipe } />
                    <Redirect from="/mtg" exact to="/magic" />
                    <Route path="/magic" exact component={ Magic } />
                    <Route path="/magic/deck/:deckName" exact component={ MagicDeck } />
                    <Route path="*" render={ (() => <Error errorCode={ 404 } />) as FunctionComponent } />
                </Switch>
                <Footer setTheme={ saveTheme }/>
            </main>
        </Router>
    );
};

render(<Sitemap />, document.getElementById("root"));
unregisterServiceWorker();
