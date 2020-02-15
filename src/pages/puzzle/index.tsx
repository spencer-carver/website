import React from "react";
import Navigation from "../../modules/Navigation";
import PuzzleAnswerSubmission from "../../modules/PuzzleAnswerSubmission";
import styles from "./styles.module.scss";

const puzzles = require("./puzzles.json");

const Puzzle = (props : any) => {
    const {
        puzzleName
    } = props.match.params;

    const puzzle = puzzles[puzzleName];

    if (!puzzle) {
        return (
            <div>
                This isn't a puzzle
            </div>
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
