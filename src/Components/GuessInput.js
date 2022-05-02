import React from "react";
import SingleBoardPiece from "./SingleBoardPiece";
import { useState, useEffect, useRef } from "react";
// import { useForm } from 'react-hook-form';
import BoardGame from "./BoardGame";
import { colors } from "../Utils/colors";

const GuessInput = ({
  secretCode,
  checkNumPlacement,
  checkCorrectNumsGuess,
}) => {
//   let colors = {
//     0: "green",
//     1: "red",
//     2: "blue",
//     3: "yellow",
//     4: "purple",
//     5: "pink",
//     6: "magenta",
//     7: "orange",
//   };

  const [userGuess, setUserGuess] = useState(null);
  const [finalUserGuess, setFinalUserGuess] = useState(null);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
  const [correctNumPlacement, setCorrectNumPlacement] = useState(null);
  const [correctNumsGuess, setCorrectNumsGuess] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    let guess = Object.values(userGuess);
    setAllUserGuesses([...allUserGuesses, guess]);
    console.log("allUserrrrr", allUserGuesses)
    setCorrectNumPlacement(checkNumPlacement(guess, secretCode));
    setCorrectNumsGuess(checkCorrectNumsGuess(guess, secretCode));

    clearInputs(event);
  };

  const getInputValue = (event) => {
    const numberValue = parseInt(event.target.value);
    setUserGuess({
      ...userGuess,
      [event.target.name]: numberValue,
    });
  };

  const clearInputs = (event) => {
   document.querySelectorAll("input").forEach(
      (input) => (input.value = "")
    );
    setUserGuess(null);
  };

  let allCircles = Object.values(colors).map((color, i) => {
    return (
      <section key={i} className="circles-numbers">
        <div key={i} className={"one-row circle demo" + " " + color}></div>
        <p>{i}</p>
      </section>
    );
  });

  let basicGame = [1, 2, 3, 4];
  let basicForm = basicGame.map((input, i) => {
    return (
      <input
        className="num-input-all"
        type="text"
        name={input}
        id={i}
        key={i}
        min="0"
        max="7"
        onKeyPress={(event) => {
          if (!/[0-7]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        required
        maxLength={1}
        minLength={1}
        onChange={getInputValue}
      />
    );
  });

  return (
    <div className="guess-input-section">
      <div className="rows input-row">{allCircles}</div>
      <form className="form-section input-form" onSubmit={onSubmit}>
        {basicForm}

        <button
          className="button-57"
          role="button"
          type="submit"
          id="submitBtn"
          title="Submit My Guess!"
        >
          <span className="text">Submit</span>
          <span>You Sure?</span>
        </button>
      </form>
      {allUserGuesses.length >= 1 && <BoardGame allUserGuesses={allUserGuesses} secretCode={secretCode} colors={colors}/>}
    </div>
  );
};

export default GuessInput;
