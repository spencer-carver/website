import React, { useState } from "react";
import { API_URL } from "../../constants/ExternalUrls";
import styles from "./styles.module.scss";

interface PuzzleAnswerSubmissionProps {
    puzzleName: string;
    onSuccess: Function;
}

interface PuzzleAnswer {
    correct: boolean;
    intermediate?: boolean;
    value: string;
}

const PuzzleAnswerSubmission = ({ puzzleName, onSuccess }: PuzzleAnswerSubmissionProps): JSX.Element => {
    const [ answer, setAnswer ] = useState("");
    const [ answers, setAnswers ] = useState([] as PuzzleAnswer[]);

    function onType(event: React.ChangeEvent<HTMLInputElement>): void {
        setAnswer((event.target as HTMLInputElement).value);
    }

    async function submit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!answer) {
            return;
        }

        const answerResponse: PuzzleAnswer = await window.fetch(`${ API_URL }/api/puzzle/${ puzzleName }/submit`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ answer })
        }).then(response => response.json());

        if (answerResponse.correct) {
            onSuccess(answerResponse.value);
        }

        setAnswers([ ...answers, answerResponse ]);
        setAnswer("");
    }

    return (
        <div className={ styles.answerbox }>
            <PastAnswers pastAnswers={ answers } />
            <form className={ styles.input } onSubmit={ submit }>
                <input type="text" placeholder="Answer Here" value={ answer } onChange={ onType }></input>
                <button type="submit">Submit</button>
            </form>
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
