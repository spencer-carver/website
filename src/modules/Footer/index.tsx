import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";

const Footer: FunctionComponent = () => {
    return (
        <div className={ styles.spacer }>
            <footer className={ styles.footer }>
                <p className={ styles.copyrightNotice }>&#169; 2019-{ (new Date()).getFullYear() } Spencer Carver</p>
            </footer>
        </div>
    );
};

export default Footer;
