import React from "react";
import Navigation from "../../modules/Navigation";
import puzzles from "../puzzle/puzzles.json";
import styles from "../puzzle/styles.module.scss";

const Puzzles = (): JSX.Element => {
    return (
        <Navigation isHomepage={ false }>
            <div className={ styles.puzzle }>
                <div className={ styles.title }>Puzzles</div>
                <div className={ styles.description }>
                    I&apos;m trying to make puzzles! Here&apos;s all my attempts in order of creation. This page is not a puzzle.
                </div>
                <ul className={ styles.list }>
                    { Object.keys(puzzles).map((puzzleName, index) => {
                        return <li key={ index }><a href={ `/puzzle/${ puzzleName }` }>{ puzzleName }</a></li>;
                    }) }
                </ul>
            </div>
        </Navigation>
    );
};

export default Puzzles;
