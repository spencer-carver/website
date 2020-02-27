import React from "react";
import Navigation from "../../modules/Navigation";
import PuzzleAnswerSubmission from "../../modules/PuzzleAnswerSubmission";
import puzzles, { Puzzle, PuzzleType } from "./puzzles";
import styles from "./styles.module.scss";
import getCookieValue from "../../utils/getCookieValue";

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
        srcUrl,
        assetSrc
    } = puzzle;

    return (
        <Navigation isHomepage={ false }>
            <PuzzleComplete puzzleName={ puzzleName } />
            <div className={ styles.puzzle }>
                <div className={ styles.title }>{ title }</div>
                <div className={ styles.description }>{ description }</div>
                { ((): JSX.Element => {
                    switch (type) {
                    case PuzzleType.video:
                        return <VideoPuzzle src={ srcUrl } subtitleSrc={ assetSrc } />;
                    case PuzzleType.pdf:
                        return <PdfPuzzle src={ srcUrl } />;
                    default:
                        return <div className={ styles.fallback }>Puzzle is Missing</div>;
                    }
                })() }
            </div>
            <PuzzleAnswerSubmission puzzleName={ puzzleName } />
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

const PuzzleComplete = ({ puzzleName }: { puzzleName: string }): JSX.Element | null => {
    const puzzleAnswer = getCookieValue(puzzleName);

    if (!puzzleAnswer) {
        return null;
    }

    return (
        <div className={ styles.solved }>
            { puzzleAnswer }
        </div>
    );
};

export default PuzzleComponent;
