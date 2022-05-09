import React from 'react';
import { useState } from "react";

const Results = ({guessesLeft, gamesWon, gamesLost}) => {

    return (
        <section className="results">
            <h2>Results</h2>
            <div className="remaining-guesses">
                <p>Remaining Guesses : {guessesLeft} </p>
            <p>Games Lost: {gamesLost}</p>
            <p>Games Won: {gamesWon}</p>

            </div>
        </section>
    );
};

export default Results;