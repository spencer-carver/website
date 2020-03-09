import React from "react";

interface AudioTrackProps {
    audioStyles: string;
    src: string;
    subtitleSrc: string;
}

const AudioTrack = ({ audioStyles, src, subtitleSrc }: AudioTrackProps): JSX.Element => {
    return (
        <audio className={ audioStyles } controls>
            <track label="English" kind="captions" srcLang="en" src={ subtitleSrc } default />
            <source src={ src } type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioTrack;
