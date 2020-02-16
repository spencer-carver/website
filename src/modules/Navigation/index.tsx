import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    FACEBOOK_URL,
    LINKEDIN_URL,
    TWITTER_URL,
    INSTAGRAM_URL
} from "../../constants/ExternalUrls";
import styles from "./styles.module.scss";

function ensureArray(value: Array<any> | any) {
    return Array.isArray(value)
        ? value
        : [ value ];
}

interface NavigationProps {
    isHomepage?: boolean,
    children: any
}

const Navigation = ({ isHomepage = false, children }: NavigationProps) => {
    const [ focus, setFocus ] = useState(0);

    useEffect(() => {
        function reportScrollY() {
            if (!isHomepage) {
                return;
            }

            const focusedSection = document.getElementById(children[focus].props.id);

            if (!focusedSection) {
                return;
            }

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

    const sectionNames = ensureArray(children).reduce((accumulatedNames, { props: { id } }) => {
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
                <Nav sections={ sectionNames } selected={ focus } setSelected={ setFocus } />
            </nav>
            { children }
        </div>
    );
};

Navigation.propTypes = {
    isHomepage: PropTypes.bool,
    children: PropTypes.any
};

const HomepageNav = () => {
    return (
        <div id="hero" className={ styles.hero }>
            <div className={ styles.slideshow }>
                <div className={ styles.image1 }></div>
                <div className={ styles.image2 }></div> 
            </div>
        </div>
    );
};

const SocialButtons = () => {
    return (
        <div className={ `${ styles.socialLinks } ${ styles.sticky }` }>
            <InstagramIcon />
            <a className={ `${ styles.socialIcon } ${ styles.facebook }` } href={ FACEBOOK_URL } target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className={ `${ styles.socialIcon } ${ styles.twitter }` } href={ TWITTER_URL } target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className={ `${ styles.socialIcon } ${ styles.linkedIn }` } href={ LINKEDIN_URL } target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
    );
};

export const InstagramIcon = ({ theme = "white" }) => {
    return <a className={ `${ styles.socialIcon } ${ styles.instagram } ${ styles[theme] }` } href={ INSTAGRAM_URL } target="_blank" rel="noopener noreferrer">Instagram</a>;
};

InstagramIcon.propTypes = {
    theme: PropTypes.string
};

const Nav = ({ sections = [], selected, setSelected } : { sections?: Array<string>, selected: number, setSelected: any }) => {
    const [ expanded, setExpanded ] = useState(false);

    function toggleMenu() {
        setExpanded(!expanded);
    }

    return (
        <div id="navBar" className={ `${ styles.navBar } ${ expanded ? styles.expanded : styles.collapsed }` }>
            <SiteLogo expanded={ expanded } onClick={ toggleMenu } />
            <div className={ styles.navContainer }>
                <div className={ `${ styles.pageNav } ${ expanded ? styles.expanded : styles.collapsed }` }>
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
                <div className={ `${ styles.siteNav } ${ expanded ? styles.expanded : styles.collapsed }` }>
                    Site Navigation: 
                    <Link to="/" className={ styles.link }>Home</Link> 
                    <Link to="/puzzles" className={ styles.link }>Puzzles</Link>
                </div>
            </div>
        </div>
    );
};

Nav.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.number.isRequired,
    setSelected: PropTypes.func.isRequired
};

const SiteLogo = ({ expanded, onClick } : { expanded: boolean, onClick: any }) => {
    return (
        <div className={ `${ styles.logo } ${ expanded ? styles.expanded : styles.collapsed }` } onClick={ onClick }>
            <div className={ styles.logoC }></div>
            <div className={ `${ styles.logoS } ${ expanded ? styles.expanded : styles.collapsed }` }></div>
        </div>
    );
};

interface NavItemProps {
    name: string,
    index: number,
    selected?: boolean,
    setSelected: Function
}

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      reference?: string;
    }
}

const NavItem = ({ name, index, selected = false, setSelected } : NavItemProps) => {
    function onItemClick(event : any) {
        setSelected(index);

        if (!event || !event.target) {
            return;
        }

        const eventTarget = event.target as HTMLElement;
        const reference = eventTarget.getAttribute("reference");

        if (!reference) {
            return;
        }

        const referenceElement = document.getElementById(reference);

        if (!referenceElement) {
            return;
        }

        const elementY = referenceElement.getBoundingClientRect().top;
        window.scrollBy(0, elementY - 50);
    }

    return (
        <div className={ `${ styles.navItem } ${ selected ? styles.selected : "" }` } reference={ name } onClick={ onItemClick }>
            { name.replace("-", " ") }
        </div>
    );
};

NavItem.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool,
    setSelected: PropTypes.func.isRequired
};

export default Navigation;
