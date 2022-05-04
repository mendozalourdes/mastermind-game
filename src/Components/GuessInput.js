import React from "react";
import SingleBoardPiece from "./SingleBoardPiece";
import { useState, useEffect, useRef } from "react";
import BoardGame from "./BoardGame";
import { colors } from "../Utils/colors";
import Results from "./Results";
import Hints from "./Hints";

const GuessInput = ({
  secretCode,
  checkNumPlacement,
  checkCorrectNumsGuess,
//   checkHints
}) => {

  const [userGuess, setUserGuess] = useState(null);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
  const [correctNumPlacement, setCorrectNumPlacement] = useState(null);
  const [correctNumsGuess, setCorrectNumsGuess] = useState(null);
  const [hints, setHints] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    let guess = Object.values(userGuess);
    setAllUserGuesses([...allUserGuesses, guess]);
    setCorrectNumPlacement(checkNumPlacement(guess, secretCode));
    setCorrectNumsGuess(checkCorrectNumsGuess(guess, secretCode));
    setHints([...hints, (checkHints(guess, secretCode))]);


    clearInputs(event);
  };

  const checkHints = (userGuess, secretCode) => {
    let secretCopy = [...secretCode]
    let guessCopy = [...userGuess]
  
    let hints = []
    
      for (var i = 0; i < secretCode.length; i++) {
        if (userGuess[i] === secretCode[i]) {
          hints.push('exact-match');
    secretCopy.splice(secretCopy.indexOf(userGuess[i]), 1)
    guessCopy.splice(guessCopy.indexOf(userGuess[i]), 1)
        }
      }
    
      for (var j = 0; j < secretCode.length; j++) {
          if(secretCopy.includes(guessCopy[j])){
              console.log("guessCopy[j", guessCopy[j])
             hints.push('almost-match')
           secretCopy.splice(secretCopy.indexOf(guessCopy[j]), 1)
          }
      }

      for (let i = 0; i <= 4; i++ ) {
          if (hints.length < 4) {
              hints.push('nope')
          }
      }
console.log("hints pre sort", hints)      
      return hints 
    }

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
        {/* <Results/> */}
      <div className="rows input-row">{allCircles}</div>
        {allUserGuesses.length >= 1 && <Results allUserGuesses={allUserGuesses} />}
        <section className="guess-input-section">
        {allUserGuesses.length >= 1 && <BoardGame allUserGuesses={allUserGuesses} secretCode={secretCode} colors={colors} allHints={hints}/>}
        {/* {allUserGuesses.length >= 1 && <Hints allUserGuessesLength={allUserGuesses.length} hints={hints}/>} */}

        </section>
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
    </div>
  );
};

export default GuessInput;
