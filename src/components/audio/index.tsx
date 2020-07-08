import React, { FunctionComponent } from "react";

interface AudioTrackProps {
    audioStyles: string;
    src: string;
    subtitleSrc: string;
}

const AudioTrack: FunctionComponent<AudioTrackProps> = ({ audioStyles, src, subtitleSrc }) => {
    return (
        <audio className={ audioStyles } controls>
            <track label="English" kind="captions" srcLang="en" src={ subtitleSrc } default />
            <source src={ src } type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioTrack;
