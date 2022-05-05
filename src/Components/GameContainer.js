import React from "react";
import { useState, useEffect} from "react";
import BoardGame from "./BoardGame";
import { colors } from "../Utils/colors";
import Results from "./Results";

const GuessInput = ({
  secretCode,
  checkNumPlacement,
  checkCorrectNumsGuess, getBasicCode
}) => {

  const [userGuess, setUserGuess] = useState(null);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
  const [correctNumPlacement, setCorrectNumPlacement] = useState(null);
  const [correctNumsGuess, setCorrectNumsGuess] = useState(null);
  const [hints, setHints] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(10)
  const [gamesWon, setGamesWon] = useState(0)
  const [gamesLost, setGamesLost] = useState(0)
  const [winGame, setWinGame] = useState(false)
  const [isOpen, setIsOpen] = useState(false)


  const handleShowModal = () => {
    setIsOpen( !isOpen );
    console.log("isopen??", isOpen)
    console.log("window.scrollY???", window.scrollY, window.scrollX);
    // getBasicCode()
    
  };
  
  const handleWin = () => {

  }

  const handleLoss = () => {

  }

  const restartGame = () => {
    getBasicCode()
    setUserGuess(null)
    setAllUserGuesses([])
    setCorrectNumPlacement(null)
    setCorrectNumsGuess(null)
    setHints([])
    setGuessesLeft(10)
    setWinGame(false)
    handleShowModal()

  }


  const onSubmit = (event) => {
    event.preventDefault();
    let guess = Object.values(userGuess);

    setAllUserGuesses([...allUserGuesses, guess]);
    setCorrectNumPlacement(checkNumPlacement(guess, secretCode));
    setCorrectNumsGuess(checkCorrectNumsGuess(guess, secretCode));
    setHints([...hints, (checkHints(guess, secretCode))]);
    winOrLose();
    setGuessesLeft(guessesLeft-1)
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
             hints.push('almost-match')
           secretCopy.splice(secretCopy.indexOf(guessCopy[j]), 1)
          }
      }

      for (let i = 0; i <= 4; i++ ) {
          if (hints.length < 4) {
              hints.push('nope')
          }
      }
      return hints 
    }

  const getInputValue = (event) => {
    const inputValue = parseInt(event.target.value);
    setUserGuess({
      ...userGuess,
      [event.target.name]: inputValue,
    });
  };



  const clearInputs = (event) => {
   document.querySelectorAll("input").forEach(
      (input) => (input.value = "")
    );
    setUserGuess(null);
  };

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

  const winOrLose = () => {
    let guess = Object.values(userGuess);
    if (JSON.stringify(guess) === JSON.stringify(secretCode)) {
        console.log("You won! ")
        setGamesWon(gamesWon+1)
        setWinGame(true)
        setIsOpen(true)
        console.log("Window.screenTop", window.screenTop)
    } else {
        setGuessesLeft(guessesLeft-1)
    }
    
    if(allUserGuesses.length === 10 && !winGame ) {
        setGamesLost(gamesLost+1)

    }
  }

  const gameWon = () => {


  }

  const gameLost = () => {

  }

  return (
    <div className="guess-input-section">
        {allUserGuesses.length >= 1 && <Results gamesWon={gamesWon} gamesLost={gamesLost} allUserGuesses={allUserGuesses} guessesLeft={guessesLeft}/>}
        <section className="guess-input-section">
        {allUserGuesses.length >= 1 && <BoardGame allUserGuesses={allUserGuesses} secretCode={secretCode} colors={colors} allHints={hints}/>}
        </section>
      <form className="form-section input-form" onSubmit={onSubmit}>
        {basicForm}
        <button
          className="button-57"
          role="button"
          type="submit"
          id="submitBtn"f
          title="Submit My Guess!"
          disabled={winGame}
          >
          <span className="text">Submit</span>
          <span>You Sure?</span>
        </button>
      </form>
            {(winGame && isOpen) && (
         <dialog
           className="dialog"
           style={{ position: "absolute" }}
           open
          //  onClick={handleShowModal}
         >
           <button className="button-57" onClick={handleShowModal}>Close</button>
           <button className="button-57" onClick={restartGame}> <span className="text">Restart Game</span>
          <span>Ready?</span></button>
       
         </dialog>
       )}
    </div>
  );
};

export default GuessInput;
