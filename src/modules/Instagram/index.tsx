import React from "react";
import Link from "../../components/link";
import { InstagramIcon } from "../Navigation";
import { INSTAGRAM_URL } from "../../constants/ExternalUrls";
import styles from "./styles.module.scss";
import "../styles.scss";

const Instagram = (): JSX.Element => {
    return (
        <div id="instagram" className="section">
            <div className={ `sectionContent ${ styles.instagram }` }>
                <Link linkStyle={ styles.cards } to={ INSTAGRAM_URL }>Instagram Posts</Link>
                <div className={ styles.blurb }>
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
