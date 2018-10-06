import React from "react";
import "./styles.css";
import {
    FACEBOOK_URL,
    GITHUB_URL,
    LINKEDIN_URL,
    TWITTER_URL
} from "../../constants/SocialUrls.js";

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="spacer-left"></div>
            <div className="site-title"><h1>Currently Under Construction</h1></div>
            <div className="social-links desktop">
                <a className="social-icon facebook" href={ FACEBOOK_URL } target="_blank" rel="noopener noreferrer">Facebook</a>
                <a className="social-icon twitter" href={ TWITTER_URL } target="_blank" rel="noopener noreferrer">Twitter</a>
                <a className="social-icon github" href={ GITHUB_URL } target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="social-icon linked-in" href={ LINKEDIN_URL } target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="social-links mobile"></div>
        </nav>
    );
};

export default Navigation;