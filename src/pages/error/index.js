import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.css";

const Error = ({ errorCode }) => {
    return (
        <div className="content">
            <span className="sadFace">:(</span>
            <span className="errorCode">{ errorCode }</span>
            <Link className="linkHome" to="/">go home</Link>
        </div>
    );
};

Error.propTypes = {
    errorCode: PropTypes.number.isRequired
};

export default Error;
