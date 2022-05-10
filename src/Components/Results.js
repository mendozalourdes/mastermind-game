import React from "react";

const Results = ({ guessesLeft, gamesWon, gamesLost }) => {
  return (
    <section className="game-stats">
      <h1 className="game-stats-header">Game Stats</h1>
      <p>Games Lost: {gamesLost}</p>
      <p>Games Won: {gamesWon}</p>
      <p>Remaining Guesses : {guessesLeft} </p>
    </section>
  );
};

export default Results;
