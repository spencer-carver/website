import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Error = ({ errorCode }) => {
    return (
        <div className={ styles.content }>
            <span className={ styles.sadFace }>:(</span>
            <span className={ styles.errorCode }>{ errorCode }</span>
            <Link className={ styles.linkHome } to="/">go home</Link>
        </div>
    );
};

Error.propTypes = {
    errorCode: PropTypes.number.isRequired
};

export default Error;
