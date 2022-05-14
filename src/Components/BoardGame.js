import React from "react";
import Row from "./Row";

const BoardGame = ({ allUserGuesses, allHints, secretCode }) => {
  //Sends over the data from the guesses to the Row component
  let everyGuessRow = allUserGuesses.map((guess, i) => {
    return (
      <Row
        key={"row_" + i}
        id={i + 1}
        guess={guess}
        allUserGuesses={allUserGuesses[i]}
        allHints={allHints}
        oneHint={allHints[i]}
      />
    );
  });

  //Render a blank board for the corresponding difficulty

  let circlesByCodeLength = secretCode.map((num, i) => {
    return (
      <div id={i + 1} key={i + 1} className={" circle demo "}>
      ❓
    </div>
    )
  })

  let gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const gameRows = gameBoard.map((num, i) => {

    return (

      <div key={i + 1} className="single-row">
        {circlesByCodeLength}
      </div>
    );
  });


  return (
    <div className={allUserGuesses.length ? "board-game"  : "pre-game"}>
      {allUserGuesses.length ? everyGuessRow : gameRows}
    </div>
  );
};

export default BoardGame;
