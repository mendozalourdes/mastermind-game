import React from 'react';
import { useState } from "react";

const Results = ({allUserGuesses}) => {
    const [gameOver, setGameover] = useState(false);

    const countEveryGuess = () => {

        if(allUserGuesses.length === 10 ) {
            setGameover(true)
        }
    }

// console.log("???",  countEveryGuess(), gameOver)
    return (
        <section className="results">
            <h2>Results</h2>
            <div className="remaining-guesses">
                <p>Remaining Guesses</p>
            <p>{10 - allUserGuesses.length}</p>

            </div>
        {gameOver && <h3>Game Over!</h3>}
        </section>
    );
};

export default Results;