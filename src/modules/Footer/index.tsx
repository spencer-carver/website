import React, { FunctionComponent } from "react";
import Theme from "../Theme";
import styles from "./styles.module.scss";

const Footer: FunctionComponent<{ setTheme: Function }> = ({ setTheme }) => {
    return (
        <>
            <div className={ styles.spacer }>
                <footer className={ styles.footer }>
                    <Theme setTheme={ setTheme } />
                    <p className={ styles.copyrightNotice }>&#169; 2019-{ (new Date()).getFullYear() } Spencer Carver</p>
                </footer>
            </div>
        </>
    );
};

export default Footer;
