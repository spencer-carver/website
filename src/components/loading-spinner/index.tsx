import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface LoadingProps {
    fadeOut?: boolean;
}

const LoadingSpinner: FunctionComponent<LoadingProps> = ({ fadeOut = false }) => {

    return (
        <div className={ `${ styles.spinner } ${ fadeOut ? styles.fade : "" }` }>
            <div className={ styles.logoC }></div>
            <div className={ styles.logoS }></div>
        </div>
    );
};

export default LoadingSpinner;
