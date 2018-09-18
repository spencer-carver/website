import React from "react";
import "./styles.css";

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="spacer-left"></div>
            <div className="site-title"><h1>Currently Under Construction</h1></div>
            <div className="social-links desktop">
                <a className="social-icon facebook" href="https://www.facebook.com/spencerrc" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a className="social-icon twitter" href="https://twitter.com/spencerrc" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a className="social-icon github" href="https://github.com/spencer-carver" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="social-icon linked-in" href="https://www.linkedin.com/in/spencerrc" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="social-links mobile"></div>
        </nav>
    );
};

export default Navigation;