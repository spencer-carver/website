import React, { useState } from "react";
import OnThePlayComponent from "../OnThePlay";
import ResultComponent from "../GameResult";

const Game = ({ number, updateGame = () => {} }) => {
    const [ onThePlay, setOnThePlay ] = useState(false);
    const [ result, setResult ] = useState("NOT_ENTERED");

    const wrappedSetOnThePlay = (updatedOnThePlay) => {
        setOnThePlay(updatedOnThePlay);
        updateGame({
            [number]: {
                onThePlay: updatedOnThePlay,
                result
            }
        });
    };

    const wrappedSetResult = (updatedResult) => {
        setResult(updatedResult);
        updateGame({
            [number]: {
                onThePlay,
                result: updatedResult
            }
        });
    };

    return (
        <div>
            Game { number }: 
            <OnThePlayComponent number={ number } onThePlay={ onThePlay } setOnThePlay={ wrappedSetOnThePlay } />
            <ResultComponent number={ number } result={ result } setResult={ wrappedSetResult } />
        </div>
    );
};

export default Game;
