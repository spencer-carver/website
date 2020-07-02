import React from "react";
import { Link } from "react-router-dom";
import ExternalLink from "../../components/link";
import Skills from "../Skills";
import calculateYearsBetween from "../../utils/calculateYearsBetween";
import {
    MOUNTAINPROJECT_URL,
    GOODREADS_URL
} from "../../constants/ExternalUrls";
import thinking from "../../images/thinking.jpg";
import thinkingWebp from "../../images/thinking.webp";
import Image from "../../components/image";
import styles from "./styles.module.scss";
import "../styles.scss";

const MY_BIRTHDAY = new Date(1991, 2, 23);

const AboutMe = (): JSX.Element => {
    return (
        <div id="about-me" className="section">
            <div className="sectionContent">
                <div className={ styles.personalBlurb }>
                    <div className={ styles.photoContainer }>
                        <Image image={ { src: thinking, srcWebp: thinkingWebp } } alt="" imageStyle={ styles.personalPhoto } />
                    </div>
                    <div className={ styles.personalDetails }>
                        <p>
                            I&apos;m a { calculateYearsBetween(MY_BIRTHDAY) } year old Software Developer based out of New York, New York.
                        </p>
                        <p>
                            I enjoy <ExternalLink linkStyle={ styles.link } to={ MOUNTAINPROJECT_URL }>Rock Climbing</ExternalLink>
                            , <Link to ="/magic" className={ styles.link }>Magic: the Gathering</Link>,
                            and <Link to ="/cocktails" className={ styles.link }>Cocktails</Link> though I wouldn&apos;t recommend combining them into a single activity.
                        </p>
                        <p>
                            I&apos;m also a fan of <Link to="/puzzles" className={ styles.link }>Puzzles</Link>, <Link to ="/recipes" className={ styles.link }>Baking and Cooking</Link>, and <ExternalLink linkStyle={ styles.link } to={ GOODREADS_URL }>Science Fiction and Fantasy novels</ExternalLink>.
                        </p>
                    </div>
                </div>
                <Skills />
            </div>
        </div>
    );
};

export default AboutMe;
