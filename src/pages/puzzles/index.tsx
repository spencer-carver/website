import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import puzzles from "../../puzzles";
import getCookieValue from "../../utils/getCookieValue";
import { PuzzleComplete } from "./puzzle";
import { Puzzle } from "../../@types/puzzles";
import styles from "./puzzle/styles.module.scss";

const Puzzles = (): JSX.Element => {
    const answerCount = Object.keys(puzzles).reduce((count: number, puzzleId: string): number => count + (getCookieValue(puzzleId) ? 1 : 0), 0);
    const [ numberAnswered, setNumberAnswered ] = useState(answerCount);

    const clearAnswer = (puzzleId: string): void => {
        document.cookie = `${ puzzleId }=; Domain=carvers.info; Path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        setNumberAnswered(numberAnswered - 1);
    };

    return (
        <Navigation isHomepage={ false }>
            <PuzzleComplete answer={ `SOLVED: ${ numberAnswered }` } />
            <div className={ styles.puzzle }>
                <div className={ styles.title }>Puzzles</div>
                <p className={ styles.description }>
                    I&apos;m trying to make puzzles! Here are all of my attempts in percieved order of difficulty.
                    If you need help with a puzzle in a way that the built-in hint system doesn&apos;t assist,
                    email your question to puzzle@carvers.info with the puzzle name as the subject and I will try and assist you.
                    This page is not a puzzle.
                </p>
                <ul className={ styles.list }>
                    { Object.keys(puzzles).map((puzzleId: string, index: number) => {
                        const puzzle = (puzzles as { [key: string]: Puzzle })[puzzleId];

                        const puzzleAnswer = getCookieValue(puzzleId);
                        const clearPuzzleAnswer = (): void => clearAnswer(puzzleId);

                        return (
                            <li key={ index }>
                                <Link to={ `/puzzle/${ puzzleId }` }>{ puzzle.title }</Link>
                                { puzzleAnswer && (
                                    <span className={ styles.answer }
                                        role="button"
                                        tabIndex={ 0 }
                                        title="Clear Answer"
                                        onKeyPress={ clearPuzzleAnswer }
                                        onClick={ clearPuzzleAnswer }
                                    >
                                        { puzzleAnswer }
                                    </span> 
                                ) }
                            </li>
                        );
                    }) }
                </ul>
                { numberAnswered > 0 && (
                    <p className={ styles.description }>
                        If you want to erase an answer (perhaps to let someone else try the puzzle), just click on it!
                    </p>
                ) }
            </div>
        </Navigation>
    );
};

export default Puzzles;
