import React from "react";
import Skills from "../Skills";
import calculateTenure from "../../utils/calculateTenure";
import styles from "./styles.module.css";
import "../styles.css";

const MY_BIRTHDAY = new Date(1991, 2, 23);

const AboutMe = () => {
    return (
        <div id="about-me" className="section">
            <div className={ styles.personalBlurb }>
                <div className={ styles.photoContainer }>
                    <div className={ styles.personalPhoto }></div>
                </div>
                <div className={ styles.personalDetails }>
                    <p>
                        I'm a { calculateTenure(MY_BIRTHDAY) } year old Software Developer based out of New York, New York.
                        I enjoy <em>Rock Climbing</em>, <em>Magic: the Gathering</em>, and <em>Cocktails</em>, though I wouldn't recommend combining them into a single activity.
                    </p>
                </div>
            </div>
            <Skills />
        </div>
    );
};

export default AboutMe;