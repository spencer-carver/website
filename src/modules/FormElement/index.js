import React from "react";
import styles from "./styles.module.scss";

const FormElement = ({ id, label, type = "text", placeholder = label, onChange = () => {}, value }) => {
    return (
        <div className={ `${ styles.input } ${ styles[type] }` }>
            <label
                htmlFor={ id }
            >
                { label }:
            </label> 
            <input
                id={ id }
                type={ type }
                placeholder={ placeholder }
                onChange={ onChange }
                value={ value }
            >
            </input>
        </div>
    );
};

export default FormElement;