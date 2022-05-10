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

  let gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const basicGameRows = gameBoard.map((num, i) => {
    return (
      <div key={i + 1} className="single-row">
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
      </div>
    );
  });

  const difficultGameRows = gameBoard.map((num, i) => {
    return (
      <div key={i + 1} className="single-row">
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
        <div id={i + 1} className={" circle demo "}>
          ❓
        </div>
        <div key={i + 1} id={i + 1} className={" circle demo "}>
          ❓
        </div>
      </div>
    );
  });

  return (
    <div className="board-game">
      {allUserGuesses.length
        ? everyGuessRow
        : secretCode.length === 4
        ? basicGameRows
        : difficultGameRows}
    </div>
  );
};

export default BoardGame;
