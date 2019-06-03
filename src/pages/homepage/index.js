import React, { useEffect } from "react";
import InstagramEmbed, { InstagramPosts, reloadInstagramEmbeds } from "../../modules/InstagramEmbed";
import { API_URL } from "../../constants/ExternalUrls";
import styles from "./styles.module.css";

const Homepage = () => {
    useEffect(() => {
        reloadInstagramEmbeds();

        window.fetch(`${API_URL}/api/healthcheck`)
            .then(response => response.json());
    });

    return (
        <div className={styles.content}>
            <p className={styles.intro}>
                Something will be here soon! In the meantime, here&#39;s some instagram posts.
            </p>
            <InstagramEmbed postId={InstagramPosts.tayaki} />
            <InstagramEmbed postId={InstagramPosts.threeViewsOfOregon} />
            <InstagramEmbed postId={InstagramPosts.hackerman} />
            <InstagramEmbed postId={InstagramPosts.valentinesLove} />
            <InstagramEmbed postId={InstagramPosts.queensboroAtNight} />
        </div>
    );
};

export default Homepage;
