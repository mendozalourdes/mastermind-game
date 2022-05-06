import React from 'react';
import { useState } from "react";

const Results = ({allUserGuesses, guessesLeft, gamesWon, gamesLost}) => {
    const [gameOver, setGameover] = useState(false);

    const countEveryGuess = () => {

        if(allUserGuesses.length === 10 ) {
            setGameover(true)
        }
    }

    return (
        <section className="results">
            <h2>Results</h2>
            <div className="remaining-guesses">
                <p>Remaining Guesses : {guessesLeft} </p>
            <p>Games Lost: {gamesLost}</p>
            <p>Games Won: {gamesWon}</p>

            </div>
        {gameOver && <h3>Game Over!</h3>}
        </section>
    );
};

export default Results;