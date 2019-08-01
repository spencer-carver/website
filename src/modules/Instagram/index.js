import React from "react";
import { InstagramIcon } from "../Navigation";
import { INSTAGRAM_URL } from "../../constants/ExternalUrls";
import styles from "./styles.module.css";
import "../styles.css";

const Instagram = () => {
    return (
        <div id="instagram" className="section">
            <div className={`sectionContent ${styles.instagram}`}>
                <a className={styles.cards} href={ INSTAGRAM_URL }>Instagram Posts</a>
                <div className={styles.blurb}>
                    <div>
                        I post climbing videos, food, and the occasional travel photos on my instagram.
                        Follow to see what I find worth sharing!
                    </div>
                    <InstagramIcon theme="black" />
                </div>
            </div>
        </div>
    );
};

export default Instagram;
