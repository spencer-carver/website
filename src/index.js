import React from "react";
import { render } from "react-snapshot";
import "./index.css";
import Homepage from "./pages/homepage";
import Error from "./pages/error";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Sitemap = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={ Homepage } />
            <Route path="*" render={ () => <Error errorCode={ 404 } /> } />
        </Switch>
    </Router>
);

render(<Sitemap />, document.getElementById("root"));
registerServiceWorker();
