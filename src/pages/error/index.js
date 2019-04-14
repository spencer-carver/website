import React from "react";
import PropTypes from "prop-types";
import Navigation from "../../modules/Navigation";
import Footer from "../../modules/Footer";
import { Link } from "react-router-dom";
import "./styles.css";

const Error = ({ errorCode }) => {
    return (
        <div className="page">
            <Navigation />
            <div className="content">
                <span className="sadFace">:(</span> <span className="errorCode">{ errorCode }</span>
                <Link className="linkHome" to="/">go home</Link>
            </div>
            <Footer />
        </div>
    );
};

Error.propTypes = {
    errorCode: PropTypes.number.isRequired
};

export default Error;
