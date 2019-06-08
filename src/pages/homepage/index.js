import React, { useEffect } from "react";
import InstagramEmbed, { InstagramPosts, reloadInstagramEmbeds } from "../../modules/InstagramEmbed";
import { API_URL } from "../../constants/ExternalUrls";
import Navigation from "../../modules/Navigation";
import styles from "./styles.module.css";
import AboutMeSection from "../../modules/AboutMe";

const Homepage = () => {
    useEffect(() => {
        window.fetch(`${API_URL}/api/healthcheck`)
            .then(response => response.json());
    });

    return (
        <Navigation isHomepage={ true }>
            { AboutMeSection() }
            { InstagramSection() }
            <div id="module-2">
                Something here later
            </div>
        </Navigation>
    );
};

const InstagramSection = () => {
    useEffect(() => {
        reloadInstagramEmbeds();
    });

    return (
        <div id="instagram" className={ styles.instagram }>
            <InstagramEmbed postId={InstagramPosts.tayaki} />
            <InstagramEmbed postId={InstagramPosts.threeViewsOfOregon} />
            <InstagramEmbed postId={InstagramPosts.hackerman} />
            <InstagramEmbed postId={InstagramPosts.valentinesLove} />
            <InstagramEmbed postId={InstagramPosts.queensboroAtNight} />
        </div>
    );
};

export default Homepage;
