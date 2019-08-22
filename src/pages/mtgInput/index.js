import React, { useState, useEffect } from "react";
//import { API_URL } from "../../constants/ExternalUrls";
import DCIWithAuth from "../../modules/MTG/DCIWithAuth";
import Game from "../../modules/MTG/Game";
import styles from "./styles.module.scss";
import "../../styles/form.scss";

const MTGInput = () => {
    const [ dciNumber, setDciNumber ] = useState(null);
    const [ userSecret, setUserSecret ] = useState("");
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
        <div className={ styles.background }>
            <form className={ styles.form }>
                <DCIWithAuth
                    dciNumber={ dciNumber }
                    setDciNumber={ setDciNumber }
                    userSecret={ userSecret }
                    setUserSecret={ setUserSecret }
                />
                <input className="textInput" type="text" placeholder="opponentDciNumber"></input>
                <input className="textInput" type="text" placeholder="deckName"></input>
                <input className="textInput" type="text" placeholder="opponentDeckName"></input>
                <input className="textInput" type="text" placeholder="event"></input>
                <input className="textInput" type="text" placeholder="format"></input>
                <input className="textInput" type="number" placeholder="round"></input>
                <GamesEntry games={ games } setGames={ setGames } />
                <input className="textInput" type="text" placeholder="notes"></input>
                <button className="submitButton centered" type="submit">Submit Match Record</button>
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
