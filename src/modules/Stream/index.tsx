import React from "react";
import STREAM from "../../images/stream.png";
import { TWITCH_URL, YOUTUBE_URL } from "../../constants/ExternalUrls";
import Link from "../../components/link";
import styles from "./styles.module.scss";

const Stream = (): JSX.Element => {
    return (
        <div className={ styles.module }>
            <div className={ styles.image }>
                <img src={ STREAM } alt="youtube and twitch logos" />
            </div>
            <div className={ styles.stream }>
                <Link linkStyle={ styles.site } to={ YOUTUBE_URL }>
                    <span>Subscribe <span className={ styles.extra }>to my Channel</span></span>
                </Link>
                <Link linkStyle={ styles.site } to={ TWITCH_URL }>
                    <span>Follow <span className={ styles.extra }>my Stream</span></span>
                </Link>
            </div>
        </div>
    );
};

export default Stream;
