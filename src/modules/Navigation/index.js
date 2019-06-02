import React from "react";
import {
    FACEBOOK_URL,
    GITHUB_URL,
    LINKEDIN_URL,
    TWITTER_URL,
    INSTAGRAM_URL
} from "../../constants/ExternalUrls";
import styles from "./styles.module.css";

const Navigation = () => {
    return (
        <nav className={ styles.navigation }>
            <div className={ styles.siteTitle }>
                <h1>Currently Under Construction</h1>
            </div>
            <div className={ `${ styles.navigation } ${ styles.socialLinks } ${ styles.sticky }` }>
                <a className={ `${ styles.socialIcon } ${ styles.instagram }` } href={ INSTAGRAM_URL } target="_blank" rel="noopener noreferrer">Instagram</a>
                <a className={ `${ styles.socialIcon } ${ styles.facebook }` } href={ FACEBOOK_URL } target="_blank" rel="noopener noreferrer">Facebook</a>
                <a className={ `${ styles.socialIcon } ${ styles.twitter }` } href={ TWITTER_URL } target="_blank" rel="noopener noreferrer">Twitter</a>
                <a className={ `${ styles.socialIcon } ${ styles.github }` } href={ GITHUB_URL } target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className={ `${ styles.socialIcon } ${ styles.linkedIn }` } href={ LINKEDIN_URL } target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </nav>
    );
};

export default Navigation;
