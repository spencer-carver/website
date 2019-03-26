import React, { Component } from "react";
import Navigation from "../../modules/Navigation";
import InstagramEmbed from "../../modules/InstagramEmbed";
//import logo from './logo.svg';
import "./styles.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navigation />
                <p className="App-intro">
                    Something will be here soon! In the meantime, here&#39;s an instagram post.
                </p>
                <InstagramEmbed />
            </div>
        );
    }
}

export default App;
