import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface ContentProps {
    src: string;
    subtitleSrc?: string;
    poster?: string;
}

const Video: FunctionComponent<ContentProps> = ({ src, subtitleSrc, poster }) => {
    return (
        <video className={ styles.video } controls poster={ poster }>
            <source src={ src } type="video/mp4" />
            <track label="English" kind="captions" srcLang="en" src={ subtitleSrc } default />
            <span className={ styles.fallback }>
                Your browser does not support HTML5 video. To view, download it <a href={ src }>here</a>.
            </span>
        </video>
    );
};

export default Video;
