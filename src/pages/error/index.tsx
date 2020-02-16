import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import styles from "./styles.module.scss";

const Error = ({ errorCode }: { errorCode: number }): JSX.Element => {
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

Error.propTypes = {
    errorCode: PropTypes.number.isRequired
};

export default Error;
