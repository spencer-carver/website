import React, { useState } from "react";
import { API_URL } from "../../constants/ExternalUrls";
import styles from "./styles.module.scss";

interface PuzzleAnswerSubmissionProps {
    puzzleName: string;
}

interface PuzzleAnswer {
    correct: boolean;
    intermediate?: boolean;
    value: string;
}

const PuzzleAnswerSubmission = ({ puzzleName }: PuzzleAnswerSubmissionProps): JSX.Element => {
    const [ answer, setAnswer ] = useState("");
    const [ answers, setAnswers ] = useState([] as PuzzleAnswer[]);

    function onType(event: React.KeyboardEvent<HTMLInputElement>): void {
        setAnswer((event.target as HTMLInputElement).value);
    }

    async function submit(): Promise<void> {
        if (!answer) {
            return;
        }

        const answerResponse: PuzzleAnswer = await window.fetch(`${ API_URL }/api/puzzle/${ puzzleName }/submit`, {
            method: "POST",
            body: JSON.stringify({ answer })
        }).then(response => response.json());

        setAnswers([ ...answers, answerResponse ]);
    }

    return (
        <div className={ styles.answerbox }>
            <PastAnswers pastAnswers={ answers } />
            <div className={ styles.input }>
                <input type="text" placeholder="Answer Here" onChange={ onType }></input>
                <button type="submit" onClick={ submit }>Submit</button>
            </div>
        </div>
    );
};

const PastAnswers = ({ pastAnswers }: { pastAnswers: PuzzleAnswer[] }): JSX.Element => {
    return (
        <ul className={ styles.pastAnswers }>
            { pastAnswers.map((pastResult, index) => {
                const answerStyle = pastResult.correct
                    ? styles.correct
                    : ( pastResult.intermediate
                        ? styles.intermediate
                        : styles.incorrect
                    );

                return <li key={ index } className={ `${ answerStyle } ${ styles.answer }` }>{ pastResult.value }</li>;
            }) }
        </ul>
    );
};

export default PuzzleAnswerSubmission;
