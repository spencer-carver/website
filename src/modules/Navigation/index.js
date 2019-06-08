import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FACEBOOK_URL,
    GITHUB_URL,
    LINKEDIN_URL,
    TWITTER_URL,
    INSTAGRAM_URL
} from "../../constants/ExternalUrls";
import styles from "./styles.module.css";

const LOAD_DELAY = 1500;

const Navigation = ({ isHomepage = false, children }) => {
    const [focus, setFocus] = useState(0);
    const [hidden, setHidden] = useState(isHomepage);

    useEffect(() => {
        const video = document.getElementById("backgroundVideo");

        setTimeout(() => {
            video && typeof video.play === "function" && video.play();
        }, LOAD_DELAY);

        function reportScrollY() {
            if (!isHomepage) {
                return;
            }

            const firstChild = document.getElementById(children[0].props.id);
            setHidden(!(firstChild.getBoundingClientRect().top < 70));

            const focusedSection = document.getElementById(children[focus].props.id);

            if (focusedSection.getBoundingClientRect().bottom < 70) {
                setFocus(focus + 1);
            } else if (focusedSection.getBoundingClientRect().top > 70) {
                setFocus(Math.max(focus - 1, 0));
            }
        }

        window.addEventListener("scroll", reportScrollY);

        return () => {
            window.removeEventListener("scroll", reportScrollY);
        };
    });

    const sectionNames = children.reduce((accumulatedNames, { props: { id } }) => {
        if (id) {
            accumulatedNames.push(id);
        }

        return accumulatedNames;
    }, []);

    return (
        <div className={ !isHomepage ? styles.spacer : "" }>
            <nav className={ styles.navigation }>
                { isHomepage && <HomepageNav /> }
                <SocialButtons />
                { !hidden && <Nav sections={ sectionNames } selected={ focus } setSelected={ setFocus } /> }
            </nav>
            { children }
        </div>
    );
};

const HomepageNav = () => {
    return (
        <div id="hero" className={styles.hero }>
            <video id="backgroundVideo" className={ styles.video } loop>
                <source src={ `${ process.env.PUBLIC_URL }/workloop.mp4` } type="video/mp4" />
            </video>
        </div>
    );
};

const SocialButtons = () => {
    return (
        <div className={ `${ styles.socialLinks } ${ styles.sticky }` }>
            <a className={ `${ styles.socialIcon } ${ styles.instagram }` } href={ INSTAGRAM_URL } target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className={ `${ styles.socialIcon } ${ styles.facebook }` } href={ FACEBOOK_URL } target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className={ `${ styles.socialIcon } ${ styles.twitter }` } href={ TWITTER_URL } target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className={ `${ styles.socialIcon } ${ styles.github }` } href={ GITHUB_URL } target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className={ `${ styles.socialIcon } ${ styles.linkedIn }` } href={ LINKEDIN_URL } target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
    );
};

const Nav = ({ sections = [], selected, setSelected }) => {
    return (
        <div id="navBar" className={ styles.navBar }>
            <Link className={ styles.linkHome } to="/">go home</Link>
            {
                sections.map((name, index) => (
                    <NavItem
                        key={ name }
                        name={ name }
                        index={ index }
                        selected={ selected === index }
                        setSelected={ setSelected }
                    />
                ))
            }
        </div>
    );
};

const NavItem = ({ name, index, selected = false, setSelected }) => {
    function onItemClick(event) {
        setSelected(index);
        const elementY = document.getElementById(event.target.getAttribute("reference")).getBoundingClientRect().top;
        window.scrollBy(0, elementY - 50);
    }

    return (
        <div className={ `${ styles.navItem } ${ selected ? styles.selected : "" }` } reference={ name } onClick={ onItemClick }>
            { name.replace("-", " ") }
        </div>
    );
};

export default Navigation;