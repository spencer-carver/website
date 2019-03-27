import React, { Component } from "react";
import Navigation from "../../modules/Navigation";
import InstagramEmbed from "../../modules/InstagramEmbed";
import "./styles.css";

class App extends Component {
    render() {
        return (
            <div className="content">
                <Navigation />
                <p className="intro">
          Something will be here soon! In the meantime, here&#39;s an instagram post.
                </p>
                <InstagramEmbed />
            </div>
        );
    }
}

export default App;
