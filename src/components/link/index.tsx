import React, { ReactElement, FunctionComponent } from "react";

interface LinkProps {
    linkStyle: string;
    to: string;
    children: Array<ReactElement> | ReactElement | string;
}

const Link: FunctionComponent<LinkProps> = ({ linkStyle, to, children }) => {
    return (
        <a className={ linkStyle }
            href={ to }
            target="_blank"
            rel="noopener noreferrer">
            { children }
        </a>
    );
};

export default Link;
