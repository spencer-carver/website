import React, { ReactElement, useState, useEffect, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import ExternalLink from "../../components/link";
import {
    FACEBOOK_URL,
    LINKEDIN_URL,
    TWITTER_URL,
    INSTAGRAM_URL,
    GITHUB_URL
} from "../../constants/ExternalUrls";
import LoadingSpinner from "../../components/loading-spinner";
import styles from "./styles.module.scss";

function ensureArray(value: Array<ReactElement> | ReactElement): Array<ReactElement> {
    return Array.isArray(value)
        ? value
        : [ value ];
}

function getIdFromDOM(): string | undefined {
    let inViewArr;

    if (document.elementsFromPoint) {
        inViewArr = document.elementsFromPoint(100, 200);
        // This is a bit of a hack, but the 'elementsFromPoint' dom util always returns the hierarchy top down.
        // I know bottom-up is: 'html', 'body', 'div#root', 'main.page', 'div.spacer', 'div#sectionId'
        // So I can reverse index into the array and find the sectionId (if it exists)
        return (inViewArr[inViewArr.length - 6] || {}).id;
    }

    // IE11 does not support the 'elementsFromPoint' method, but does have it's own which isn't
    // categorized by typescript. Additionally, IE11 does not recognize the '<main>' element, so
    // it will return an array that is 1 less element than modern browsers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inViewArr = (document as any).msElementsFromPoint(100, 200);
    return (inViewArr[inViewArr.length - 5] || {}).id;
}

interface NavigationProps {
    isLoading?: boolean;
    children: Array<ReactElement> | ReactElement;
}

const Navigation: FunctionComponent<NavigationProps> = ({ isLoading = false, children }) => {
    const [ focus, setFocus ] = useState(0);
    const [ expanded, setExpanded ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ stillLoading, setStillLoading ] = useState(false);

    function toggleMenu(): void {
        setExpanded(!expanded);
    }

    const sectionNames = ensureArray(children).reduce((accumulatedNames: string[], { props: { id } }: { props: { id: string } }) => {
        accumulatedNames.push(id || "");

        return accumulatedNames;
    }, []);

    useEffect(() => {
        function reportScrollY(): void {
            if (sectionNames.length === 0) {
                return;
            }

            const id = getIdFromDOM();

            if (!id) {
                return;
            }

            setFocus(Math.max(0, sectionNames.indexOf(id)));
        }

        window.addEventListener("scroll", reportScrollY);

        return (): void => {
            window.removeEventListener("scroll", reportScrollY);
        };
    });

    useEffect(() => {
        if (isLoading && !stillLoading) {
            setTimeout(() => setStillLoading(true), 75);
        }

        if (stillLoading && isLoading && !loading) {
            setLoading(true);
        }

        if (stillLoading && !isLoading && !loading) {
            setStillLoading(false);
        }

        if (!isLoading && loading) {
            setStillLoading(false);
            setTimeout(() => setLoading(false), 750);
        }
    }, [ isLoading, loading, stillLoading ]);

    return (
        <div className={ styles.spacer }>
            <nav className={ styles.navigation }>
                <SiteLogo expanded={ expanded } onClick={ toggleMenu } />
                <SocialButtons />
                <SiteNav expanded={ expanded } />
                <PageNav sections={ sectionNames } selected={ focus } setSelected={ setFocus } expanded={ expanded } />
            </nav>
            { loading && <LoadingSpinner fadeOut={ !stillLoading } /> }
            { children }
        </div>
    );
};

const SocialButtons: FunctionComponent = () => {
    return (
        <div className={ `${ styles.socialLinks } ${ styles.sticky }` }>
            <InstagramIcon />
            <ExternalLink
                linkStyle={ `${ styles.socialIcon } ${ styles.facebook }` }
                to={ FACEBOOK_URL }>
                Facebook
            </ExternalLink>
            <ExternalLink
                linkStyle={ `${ styles.socialIcon } ${ styles.twitter }` }
                to={ TWITTER_URL }>
                Twitter
            </ExternalLink>
            <ExternalLink
                linkStyle={ `${ styles.socialIcon } ${ styles.linkedIn }` }
                to={ LINKEDIN_URL }>
                LinkedIn
            </ExternalLink>
        </div>
    );
};

export const InstagramIcon: FunctionComponent<{ theme?: string }> = ({ theme = "white" }) => {
    return (
        <ExternalLink
            linkStyle={ `${ styles.socialIcon } ${ styles.instagram } ${ styles[theme] }` }
            to={ INSTAGRAM_URL }>
            Instagram
        </ExternalLink>
    );
};

interface SiteNavProps {
    expanded: boolean;
}

const SiteNav: FunctionComponent<SiteNavProps> = ({ expanded }) => {
    return (
        <div className={ `${ styles.siteNav } ${ expanded ? styles.expanded : styles.collapsed }` }>
            <div className={ styles.siteNavContents }>
                <Link to="/" className={ styles.link }>Home</Link>
                <Link to="/puzzles" className={ styles.link }>Puzzles</Link>
                <Link to="/recipes" className={ styles.link }>Recipes</Link>
                <Link to="/cocktails" className={ styles.link }>Cocktails</Link>
                <Link to="/magic" className={ styles.link }>Magic</Link>
                <ExternalLink to={ GITHUB_URL } linkStyle={ styles.link }>Github</ExternalLink>
            </div>
        </div>
    );
};

interface PageNavProps {
    sections?: Array<string>;
    selected: number;
    setSelected: Function;
    expanded: boolean;
}

const PageNav: FunctionComponent<PageNavProps> = ({ sections = [], selected, setSelected, expanded }) => {
    return (
        <div id="navBar" className={ `${ styles.navBar } ${ expanded ? styles.expanded : styles.collapsed }` }>
            <div className={ styles.navContainer }>
                <div className={ `${ styles.pageNav } ${ expanded ? styles.expanded : styles.collapsed }` }>
                    {  
                        sections.map((name, index) => {
                            if (!name) {
                                return null;
                            }

                            return (
                                <NavItem
                                    key={ name }
                                    name={ name }
                                    index={ index }
                                    selected={ selected === index }
                                    setSelected={ setSelected }
                                />
                            );
                        })
                    }
                </div>
                <div className={ styles.siteNavBackground }></div>
            </div>
        </div>
    );
};

interface SiteLogoProps {
    expanded: boolean;
    onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent) => void);
}

const SiteLogo: FunctionComponent<SiteLogoProps> = ({ expanded, onClick }) => {
    return (
        <div className={ `${ styles.logo } ${ styles.sticky } ${ expanded ? styles.expanded : styles.collapsed }` }
            role="button"
            aria-label={ expanded ? "Close Site Nav" : "Open Site Nav" }
            tabIndex={ 0 }
            onClick={ onClick }
            onKeyPress={ onClick }>
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

const NavItem: FunctionComponent<NavItemProps> = ({ name, index, selected = false, setSelected }) => {
    function onItemClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent): void {
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

    const readableName = name.replace("-", " ");

    return (
        <div className={ `${ styles.navItem } ${ selected ? styles.selected : "" }` } reference={ name }
            role="button"
            aria-label={ `Go to ${ readableName }` }
            tabIndex={ 0 }
            onClick={ onItemClick }
            onKeyPress={ onItemClick }>
            { readableName }
        </div>
    );
};

export default Navigation;
