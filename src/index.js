import "react-app-polyfill/ie11";
import React from "react";
import { render } from "react-snapshot";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./modules/Navigation";
import Footer from "./modules/Footer";
import Homepage from "./pages/homepage";
import Error from "./pages/error";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const Sitemap = () => (
    <Router>
        <div className="page">
            <Navigation />
            <Switch>
                <Route path="/" exact component={ Homepage } />
                <Route path="*" render={ () => <Error errorCode={ 404 } /> } />
            </Switch>
            <Footer />
        </div>
    </Router>
);

render(<Sitemap />, document.getElementById("root"));
registerServiceWorker();
