import "react-app-polyfill/ie11";
import React, { Suspense, lazy } from "react";
import { render } from "react-snapshot";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Footer from "./modules/Footer";
import Homepage from "./pages/homepage";
import registerServiceWorker from "./registerServiceWorker";
import "./index.scss";

const Puzzles = lazy(() => import("./pages/puzzles"));
const Puzzle = lazy(() => import("./pages/puzzle"));
const Cocktails = lazy(() => import("./pages/cocktails"));
const Error = lazy(() => import("./pages/error"));

const Sitemap = (): JSX.Element => (
    <Suspense fallback={ <div>Loading...</div> }>
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
    </Suspense>
);

render(<Sitemap />, document.getElementById("root"));
registerServiceWorker();
