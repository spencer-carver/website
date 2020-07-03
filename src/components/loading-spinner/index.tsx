import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";

const LoadingSpinner: FunctionComponent = () => {

    return (
        <div className={ styles.spinner }>
            <div className={ styles.logoC }></div>
            <div className={ styles.logoS }></div>
        </div>
    );
};

export default LoadingSpinner;
