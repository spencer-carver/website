import React, { useState } from "react";
import { API_URL } from "../../constants/ExternalUrls";
import styles from "./styles.module.scss";

interface PuzzleAnswerSubmissionProps {
    puzzleName: string
}

const PuzzleAnswerSubmission = ({ puzzleName } : PuzzleAnswerSubmissionProps) => {
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([] as any[]);

    function onType(event : any) {
        setAnswer(event.target.value);
    }

    async function submit() {
        if (!answer) {
            return;
        }

        const answerResponse = await window.fetch(`${ API_URL }/api/puzzle/${ puzzleName }/submit`, {
            method: "POST",
            body: JSON.stringify({ answer })
        }).then(response => response.json());

        console.log(answerResponse);

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

interface PastAnswersProps {
    pastAnswers: any[]
}

const PastAnswers = ({ pastAnswers } : PastAnswersProps) => {
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
