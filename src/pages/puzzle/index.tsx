import React, { useState } from "react";
import Navigation from "../../modules/Navigation";
import PuzzleAnswerSubmission from "../../modules/PuzzleAnswerSubmission";
import puzzles, { Puzzle, PuzzleType } from "../../puzzles";
import getCookieValue from "../../utils/getCookieValue";
import { FunctionalComponent } from "../../constants/Types";
import styles from "./styles.module.scss";

interface PuzzleRouterProps {
    match: {
        params: {
            puzzleName: string;
        };
    };
}

const PuzzleComponent = (props: PuzzleRouterProps): JSX.Element => {
    const {
        puzzleName
    } = props.match.params;

    const [ answer, setAnswer ] = useState(getCookieValue(puzzleName));

    const puzzle = (puzzles as { [key: string]: Puzzle })[puzzleName];

    if (!puzzle) {
        return (
            <Navigation isHomepage={ false }>
                <div>This isn&apos;t a puzzle</div>
            </Navigation>
        );
    }

    const {
        title,
        type,
        description,
        content,
        srcUrl,
        assetSrc
    } = puzzle;

    return (
        <Navigation isHomepage={ false }>
            <PuzzleComplete answer={ answer } />
            <div className={ styles.puzzle }>
                <div className={ styles.title }>{ title }</div>
                <div className={ styles.description }>{ description }</div>
                { ((): JSX.Element => {
                    switch (type) {
                    case PuzzleType.video:
                        return <VideoPuzzle src={ srcUrl as string } subtitleSrc={ assetSrc } />;
                    case PuzzleType.pdf:
                        return <PdfPuzzle src={ srcUrl as string } />;
                    case PuzzleType.html:
                        const PuzzleContent = content as FunctionalComponent; // eslint-disable-line no-case-declarations

                        return <PuzzleContent />;
                    default:
                        return <div className={ styles.fallback }>Puzzle is Missing</div>;
                    }
                })() }
            </div>
            <PuzzleAnswerSubmission puzzleName={ puzzleName } onSuccess={ setAnswer } />
        </Navigation>
    );
};

interface ContentProps {
    src: string;
    subtitleSrc?: string;
}

const VideoPuzzle = ({ src, subtitleSrc }: ContentProps): JSX.Element => {
    return (
        <video className={ styles.video } controls>
            <source src={ src } type="video/mp4" />
            <track label="English" kind="captions" srcLang="en" src={ subtitleSrc } default />
            <span className={ styles.fallback }>
                Your browser does not support HTML5 video. To view, download it <a href={ src }>here</a>.
            </span>
        </video>
    );
};

const PdfPuzzle = ({ src }: ContentProps): JSX.Element => {
    return (
        <object className={ styles.pdf } data={ src } type="application/pdf" >
            <span className={ styles.fallback }>
                Could not display the PDF. To view, download it <a href={ src }>here</a>.
            </span>
        </object>
    );
};

export const PuzzleComplete = ({ answer }: { answer: string | null }): JSX.Element | null => {
    if (!answer) {
        return null;
    }

    return (
        <div className={ styles.solved }>
            { answer }
        </div>
    );
};

export default PuzzleComponent;
