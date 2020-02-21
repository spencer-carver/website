import React from "react";
import Navigation from "../../modules/Navigation";
import PuzzleAnswerSubmission from "../../modules/PuzzleAnswerSubmission";
import puzzles from "./puzzles.json";
import styles from "./styles.module.scss";

interface PuzzleRouterProps {
    match: {
        params: {
            puzzleName: string;
        };
    };
}

export interface Puzzle {
    title: string;
    description?: string;
    content: string;
}

const Puzzle = (props: PuzzleRouterProps): JSX.Element => {
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
        description,
        content
    } = puzzle;

    return (
        <Navigation isHomepage={ false }>
            <div className={ styles.puzzle }>
                <div className={ styles.title }>{ title }</div>
                <div className={ styles.description }>{ description }</div>
                <div className={ styles.content } dangerouslySetInnerHTML={ { __html: content } } />
            </div>
            <PuzzleAnswerSubmission puzzleName={ puzzleName } />
        </Navigation>
    );
};

export default Puzzle;
