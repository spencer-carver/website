import React from "react";
import Skills from "../Skills";
import calculateYearsBetween from "../../utils/calculateYearsBetween";
import {
    MOUNTAINPROJECT_URL
} from "../../constants/ExternalUrls";
import styles from "./styles.module.scss";
import "../styles.scss";

const MY_BIRTHDAY = new Date(1991, 2, 23);

const AboutMe = () => {
    return (
        <div id="about-me" className="section">
            <div className="sectionContent">
                <div className={styles.personalBlurb}>
                    <div className={styles.photoContainer}>
                        <div className={styles.personalPhoto}></div>
                    </div>
                    <div className={styles.personalDetails}>
                        <p>
                            I&apos;m a {calculateYearsBetween(MY_BIRTHDAY)} year old Software Developer based out of New York, New York.
                            I enjoy <a className={ styles.link } href={ MOUNTAINPROJECT_URL } target="_blank" rel="noopener noreferrer">Rock Climbing</a>,
                            Magic: the Gathering,
                            and Cocktails
                            though I wouldn&apos;t recommend combining them into a single activity.
                        </p>
                    </div>
                </div>
                <Skills />
            </div>
        </div>
    );
};

export default AboutMe;
