import React, { useState, FunctionComponent } from "react";
import Navigation from "../../../modules/Navigation";
import Video from "../../../components/video";
import PuzzleAnswerSubmission from "../../../modules/PuzzleAnswerSubmission";
import puzzles from "../../../puzzles";
import getCookieValue from "../../../utils/getCookieValue";
import { Puzzle, PuzzleType } from "../../../@types/puzzles";
import styles from "./styles.module.scss";

interface PuzzleRouterProps {
    match: {
        params: {
            puzzleName: string;
        };
    };
}

interface ContentProps {
    src: string;
    subtitleSrc?: string;
}

const PdfPuzzle: FunctionComponent<ContentProps> = ({ src }) => {
    return (
        <object className={ styles.pdf } data={ src } type="application/pdf" >
            <span className={ styles.fallback }>
                Could not display the PDF. To view, download it <a href={ src }>here</a>.
            </span>
        </object>
    );
};

export const PuzzleComplete: FunctionComponent<{ answer: string | null }> = ({ answer }) => {
    if (!answer) {
        return null;
    }

    return (
        <div className={ styles.solved }>
            { answer }
        </div>
    );
};

const PuzzleComponent: FunctionComponent<PuzzleRouterProps> = (props) => {
    const {
        puzzleName
    } = props.match.params;

    const [ answer, setAnswer ] = useState(getCookieValue(puzzleName));

    const puzzle = (puzzles as { [key: string]: Puzzle })[puzzleName];

    if (!puzzle) {
        return (
            <Navigation>
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let PuzzleContent: FunctionComponent<any>;
    let contentProps: ContentProps = {} as ContentProps;

    switch (type) {
    case PuzzleType.video:
        PuzzleContent = Video;
        contentProps = {
            src: srcUrl as string,
            subtitleSrc: assetSrc
        };
        break;
    case PuzzleType.pdf:
        PuzzleContent = PdfPuzzle;
        contentProps = {
            src: srcUrl as string
        };
        break;
    case PuzzleType.html:
        PuzzleContent = content as FunctionComponent;
        break;
    default:
        PuzzleContent = (() => <div className={ styles.fallback }>Puzzle is Missing</div>) as FunctionComponent;
    }

    return (
        <Navigation>
            <PuzzleComplete answer={ answer } />
            <div className={ styles.puzzle }>
                <div className={ styles.title }>{ title }</div>
                <div className={ styles.description }>{ description }</div>
                <PuzzleContent { ...contentProps } />
            </div>
            <PuzzleAnswerSubmission puzzleName={ puzzleName } onSuccess={ setAnswer } />
        </Navigation>
    );
};

export default PuzzleComponent;
