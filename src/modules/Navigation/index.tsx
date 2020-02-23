import React, { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    FACEBOOK_URL,
    LINKEDIN_URL,
    TWITTER_URL,
    INSTAGRAM_URL
} from "../../constants/ExternalUrls";
import styles from "./styles.module.scss";

function ensureArray(value: Array<ReactElement> | ReactElement): Array<ReactElement> {
    return Array.isArray(value)
        ? value
        : [ value ];
}

interface NavigationProps {
    children: Array<ReactElement> | ReactElement;
}

const Navigation = ({ children }: NavigationProps): JSX.Element => {
    const [ focus, setFocus ] = useState(0);
    const [ expanded, setExpanded ] = useState(false);

    function toggleMenu(): void {
        setExpanded(!expanded);
    }

    const sectionNames = ensureArray(children).reduce((accumulatedNames: string[], { props: { id } }: { props: { id: string } }) => {
        if (id) {
            accumulatedNames.push(id);
        }

        return accumulatedNames;
    }, []);

    useEffect(() => {
        function reportScrollY(): void {
            if (sectionNames.length === 0) {
                return;
            }

            const focusedSection = document.getElementById(sectionNames[focus]);

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

        return (): void => {
            window.removeEventListener("scroll", reportScrollY);
        };
    });

    return (
        <div className={ styles.spacer }>
            <nav className={ styles.navigation }>
                <SiteLogo expanded={ expanded } onClick={ toggleMenu } />
                <SocialButtons />
                <SiteNav expanded={ expanded } />
                <PageNav sections={ sectionNames } selected={ focus } setSelected={ setFocus } expanded={ expanded } />
            </nav>
            { children }
        </div>
    );
};

Navigation.propTypes = {
    isHomepage: PropTypes.bool,
    children: PropTypes.any
};

const SocialButtons = (): JSX.Element => {
    return (
        <div className={ `${ styles.socialLinks } ${ styles.sticky }` }>
            <InstagramIcon />
            <a className={ `${ styles.socialIcon } ${ styles.facebook }` } href={ FACEBOOK_URL } target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className={ `${ styles.socialIcon } ${ styles.twitter }` } href={ TWITTER_URL } target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className={ `${ styles.socialIcon } ${ styles.linkedIn }` } href={ LINKEDIN_URL } target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
    );
};

export const InstagramIcon = ({ theme = "white" }): JSX.Element => {
    return <a className={ `${ styles.socialIcon } ${ styles.instagram } ${ styles[theme] }` } href={ INSTAGRAM_URL } target="_blank" rel="noopener noreferrer">Instagram</a>;
};

InstagramIcon.propTypes = {
    theme: PropTypes.string
};

interface SiteNavProps {
    expanded: boolean;
}

const SiteNav = ({ expanded }: SiteNavProps): JSX.Element => {
    return (
        <div className={ `${ styles.siteNav } ${ expanded ? styles.expanded : styles.collapsed }` }>
            <div className={ styles.siteNavContents }>
                <Link to="/" className={ styles.link }>Home</Link> 
                <Link to="/puzzles" className={ styles.link }>Puzzles</Link>
            </div>
        </div>
    );
};

SiteNav.propTypes = {
    expanded: PropTypes.bool.isRequired
};

interface PageNavProps {
    sections?: Array<string>;
    selected: number;
    setSelected: Function;
    expanded: boolean;
}

const PageNav = ({ sections = [], selected, setSelected, expanded }: PageNavProps): JSX.Element => {
    return (
        <div id="navBar" className={ `${ styles.navBar } ${ expanded ? styles.expanded : styles.collapsed }` }>
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
                <div className={ styles.siteNavBackground }></div>
            </div>
        </div>
    );
};

PageNav.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.number.isRequired,
    setSelected: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired
};

interface SiteLogoProps {
    expanded: boolean;
    onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void);
}

const SiteLogo = ({ expanded, onClick }: SiteLogoProps): JSX.Element => {
    return (
        <div className={ `${ styles.logo } ${ styles.sticky } ${ expanded ? styles.expanded : styles.collapsed }` } onClick={ onClick }>
            <div className={ styles.logoC }></div>
            <div className={ `${ styles.logoS } ${ expanded ? styles.expanded : styles.collapsed }` }></div>
        </div>
    );
};

interface NavItemProps {
    name: string;
    index: number;
    selected?: boolean;
    setSelected: Function;
}

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      reference?: string;
    }
}

const NavItem = ({ name, index, selected = false, setSelected }: NavItemProps): JSX.Element => {
    function onItemClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
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