import React, { ReactElement } from "react";

interface LinkProps {
    linkStyle: string;
    to: string;
    children: Array<ReactElement> | ReactElement | string;
}

const Link = ({ linkStyle, to, children }: LinkProps): JSX.Element => {
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
