import React from "react";
import styles from "./styles.module.scss";

const Footer = () => {
    return (
        <div className={ styles.spacer }>
            <footer className={ styles.footer }>
                <p className={ styles.copyrightNotice }>&#169; 2019 Spencer Carver</p>
            </footer>
        </div>
    );
};

export default Footer;
