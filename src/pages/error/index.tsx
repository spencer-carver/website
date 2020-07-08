import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import styles from "./styles.module.scss";

const Error: FunctionComponent<{ errorCode: number }> = ({ errorCode }) => {
    return (
        <Navigation>
            <div className={ styles.content }>
                <span className={ styles.sadFace }>:(</span>
                <span className={ styles.errorCode }>{ errorCode }</span>
                <Link className={ styles.linkHome } to="/">go home</Link>
            </div>
        </Navigation>
    );
};

export default Error;
