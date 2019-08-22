import React from "react";
import styles from "./styles.module.scss";

const OnThePlay = ({ number, onThePlay, setOnThePlay }) => {
    return (
        <div className={ styles.selector }>
            on the:
            <input type="radio"
                name={ `g${ number }OnThePlay` }
                value="true"
                checked={ !!onThePlay }
                onChange={ () => setOnThePlay(true) }>
            </input> Play
            <input type="radio"
                name={ `g${ number }OnTheDraw` }
                value="false"
                checked={ !onThePlay }
                onChange={ () => setOnThePlay(false) }>
            </input> Draw
        </div>
    );
};

export default OnThePlay;
