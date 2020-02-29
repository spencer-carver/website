import "react-app-polyfill/ie11";
import React from "react";
import { render } from "react-snapshot";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Footer from "./modules/Footer";
import Homepage from "./pages/homepage";
import Puzzles from "./pages/puzzles";
import Puzzle from "./pages/puzzle";
import Cocktails from "./pages/cocktails";
import Error from "./pages/error";
import registerServiceWorker from "./registerServiceWorker";
import "./index.scss";

const Sitemap = (): JSX.Element => (
    <Router>
        <main className="page">
            <Switch>
                <Route path="/" exact component={ Homepage } />
                <Redirect from="/puzzle" exact to="/puzzles" />
                <Route path="/puzzles" exact component={ Puzzles } />
                <Route path="/puzzle/:puzzleName" exact component={ Puzzle } />
                <Redirect from="/cocktail" exact to="/cocktails" />
                <Route path="/cocktails" exact component={ Cocktails } />
                <Route path="*" render={ (): JSX.Element => <Error errorCode={ 404 } /> } />
            </Switch>
            <Footer />
        </main>
    </Router>
);

render(<Sitemap />, document.getElementById("root"));
registerServiceWorker();
