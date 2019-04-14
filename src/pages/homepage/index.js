import React, { Component } from "react";
import InstagramEmbed, { InstagramPosts, reloadInstagramEmbeds } from "../../modules/InstagramEmbed";
import { API_URL } from "../../constants/ExternalUrls";
import "./styles.css";

class Homepage extends Component {
    componentDidMount() {
        reloadInstagramEmbeds();

        window.fetch(`${ API_URL }/api/healthcheck`)
            .then(response => response.json());
    }

    render() {
        return (
            <div className="content">
                <p className="intro">
                    Something will be here soon! In the meantime, here&#39;s some instagram posts.
                </p>
                <InstagramEmbed postId={ InstagramPosts.hackerman } />
                <InstagramEmbed postId={ InstagramPosts.valentinesLove } />
                <InstagramEmbed postId={ InstagramPosts.pacificCrestTrail } />
                <InstagramEmbed postId={ InstagramPosts.queensboroAtNight } />
            </div>
        );
    }
}

export default Homepage;
