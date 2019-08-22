import React from "react";
import styles from "./styles.module.scss";

const GameResult = ({ number, result, setResult }) => {
    return (
        <div className={ styles.selector }>
            result:
            <input type="radio"
                name={ `g${ number }Win` }
                value="W"
                checked={ result === "WIN" }
                onChange={ () => setResult("WIN") }>
            </input> W
            <input type="radio"
                name={ `g${ number }Loss` }
                value="L"
                checked={ result === "LOSS" }
                onChange={ () => setResult("LOSS") }>
            </input> L
            <input type="radio"
                name={ `g${ number }Draw` }
                value="D"
                checked={ result === "UNINTENTIONAL_DRAW" }
                onChange={ () => setResult("UNINTENTIONAL_DRAW") }>
            </input> D
            <input type="radio"
                name={ `g${ number }ID` }
                value="ID"
                checked={ result === "INTENTIONAL_DRAW" }
                onChange={ () => setResult("INTENTIONAL_DRAW") }>
            </input> ID
        </div>
    );
};

export default GameResult;
