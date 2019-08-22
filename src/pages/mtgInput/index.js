import React, { useState, useEffect } from "react";
//import { API_URL } from "../../constants/ExternalUrls";
import DCIWithAuth from "../../modules/MTG/DCIWithAuth";
import Game from "../../modules/MTG/Game";
import styles from "./styles.module.scss";

const MTGInput = () => {
    const [ dciNumber, setDciNumber ] = useState(null);
    const [ userSecret, setUserSecret ] = useState(null);
    const [ games, setGames ] = useState({ 1: {} });

    useEffect(() => {
        try {
            const storedSecret = window.localStorage.getItem("userSecret");
            setUserSecret(storedSecret);
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div>
            <form className={ styles.form }>
                <DCIWithAuth
                    dciNumber={ dciNumber }
                    setDciNumber={ setDciNumber }
                    userSecret={ userSecret }
                    setUserSecret={ setUserSecret }
                />
                <input type="text" placeholder="opponentDciNumber"></input>
                <input type="text" placeholder="deckName"></input>
                <input type="text" placeholder="opponentDeckName"></input>
                <input type="text" placeholder="event"></input>
                <input type="text" placeholder="format"></input>
                <input type="number" placeholder="round"></input>
                <GamesEntry games={ games } setGames={ setGames } />
                <input type="text" placeholder="notes"></input>
                <button type="submit">Submit Match Record</button>
            </form>
        </div>
    );
};

const GamesEntry = ({ games, setGames }) => {
    const updateGame = (updatedGame) => setGames(Object.assign({}, games, updatedGame));
    const addGame = () => {
        const newGameNumber = Object.keys(games).length + 1;
        setGames(Object.assign({}, games, { [newGameNumber]: {} }));
    };

    return (
        <div>
            { Object.keys(games).map((number) => (
                <Game
                    key={ number }
                    number={ number }
                    updateGame={ updateGame }
                />
            )) }
            <button type="button" onClick={ addGame }>add game</button>
        </div>
    );
};

export default MTGInput;
