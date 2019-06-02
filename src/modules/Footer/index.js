import React from "react";
import styles from "./styles.module.css";

const Footer = () => {
    return (
        <footer className={ styles.footer }>
            <p className={ styles.copyrightNotice }>&#169; 2019 Spencer Carver</p>
        </footer>
    );
};

export default Footer;
