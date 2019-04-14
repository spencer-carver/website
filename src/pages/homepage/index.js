import React, { Component } from "react";
import Navigation from "../../modules/Navigation";
import Footer from "../../modules/Footer";
import InstagramEmbed, { InstagramPosts } from "../../modules/InstagramEmbed";
import { API_URL } from "../../constants/ExternalUrls";
import "./styles.css";

class App extends Component {
    componentDidMount() {
        window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process == "function" && window.instgrm.Embeds.process();

        window.fetch(`${ API_URL }/api/healthcheck`)
            .then(response => response.json())
            .then(console.log);
    }

    render() {
        return (
            <div className="page">
                <Navigation />
                <p className="intro">
                    Something will be here soon! In the meantime, here&#39;s some instagram posts.
                </p>
                <div className="content">
                    <InstagramEmbed postId={ InstagramPosts.hackerman } />
                    <InstagramEmbed postId={ InstagramPosts.valentinesLove } />
                    <InstagramEmbed postId={ InstagramPosts.pacificCrestTrail } />
                    <InstagramEmbed postId={ InstagramPosts.queensboroAtNight } />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
