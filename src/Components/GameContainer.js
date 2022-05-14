import React from "react";
import { useState, useRef, useEffect } from "react";
import BoardGame from "./BoardGame";
import { colors } from "../Utils/colors";
import Results from "./Results";
import NavBar from "./NavBar";

const GameContainer = ({
  secretCode,
  checkNumPlacement,
  checkCorrectNumsGuess,
  getCode,
  useLocalStorage,
  checkHints,
  handleInputChange,
  gameLevel,
  handleLevelChange,
}) => {
  const [userGuess, setUserGuess] = useState(null);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
  const [correctNumPlacement, setCorrectNumPlacement] = useState(null);
  const [correctNumsGuess, setCorrectNumsGuess] = useState(null);
  const [hints, setHints] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(10);
  const [gamesWon, setGamesWon] = useLocalStorage("gamesWon", 0);
  const [gamesLost, setGamesLost] = useLocalStorage("gamesLost", 0);
  const [winGame, setWinGame] = useState(false);
  const [loseGame, setLoseGame] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const bottomOfPageRef = useRef(null);
  const myRefs = useRef([]);

  //Scrolls to the bottom of the page for the user to focus on the input fields
  useEffect(() => {
    bottomOfPageRef.current.scrollIntoView({ behavior: "smooth" });
  });

//Handles the win/lose modal
  const handleShowModal = () => {
    setIsOpen(!isOpen);
  };

//Updates state when user wins
  const handleWin = () => {
    setGamesWon(gamesWon + 1);
    setWinGame(true);
    setGameOver(true);
    setIsOpen(true);
  };

//Updates state when user loses
  const handleLoss = () => {
    setGamesLost(gamesLost + 1);
    setGameOver(true);
    setIsOpen(true);
    setLoseGame(true);
  };

//Restarts the game, resets user inputs
  const restartGame = () => {
    getCode();
    setUserGuess(null);
    setAllUserGuesses([]);
    setCorrectNumPlacement(null);
    setCorrectNumsGuess(null);
    setHints([]);
    setGuessesLeft(10);
    setWinGame(false);
    setGameOver(false);
    handleShowModal();
  };

//Handles guess submission, updates state
  const onSubmit = (event) => {
    event.preventDefault();
    let guess = Object.values(userGuess);

    setAllUserGuesses([...allUserGuesses, guess]);
    setCorrectNumPlacement(checkNumPlacement(guess, secretCode));
    setCorrectNumsGuess(checkCorrectNumsGuess(guess, secretCode));
    setHints([...hints, checkHints(guess, secretCode)]);
    winOrLose();
    setGuessesLeft(guessesLeft - 1);
    clearInputs(event);
    myRefs.current[0].focus();
  };

//Receives the input fields, to capture each entered number
const getInputValue = (event) => {
  const inputValue = parseInt(event.target.value);
  if(inputValue || inputValue === 0) {
    event.target.className = `num-input ${colors[inputValue]} `
    handleInputChange(event);
    setUserGuess({
      ...userGuess,
      [event.target.name]: inputValue,
    });
  }
   else {
    event.target.className = "num-input"
  }
};
//Clears the input fields for user to have a blank form each time
  const clearInputs = () => {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    document.querySelectorAll("input").forEach((input) => (input.className = "num-input"));

    setUserGuess(null);
  };

//determines whether the player has won or lost
  const winOrLose = () => {
    let guess = Object.values(userGuess);

    if (JSON.stringify(guess) === JSON.stringify(secretCode)) {
      handleWin();
    } else {
      setGuessesLeft(guessesLeft - 1);
    }
    if (allUserGuesses.length === 9 && !winGame) {
      handleLoss();
    }
  };

//Reveals the winning code whether the user wins or loses
  const secretColors = () => {
    return secretCode.map((num, i) => {
      return (
        <div key={i} className={" circle demo " + colors[num]}>
          {num}
        </div>
      );
    });
  };

//Resets the guesses after the user updates the difficulty level
  const resetGuesses = (value, event) => {
    setAllUserGuesses(value);
    setHints(value);
    clearInputs(event);
    setGuessesLeft(10);
  };

//Renders input fields based on the length of the secret code
  let fullForm = secretCode.map((num, i) => {
    return (
      <input
        className="num-input"
        type="text"
        name={`${"input-" + i}`}
        id={i}
        key={i}
        min="0"
        max="7"
        ref={(el) => (myRefs.current[i] = el)}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onKeyPress={(event) => {
          if (!/[0-7]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        required
        disabled={winGame || gameOver}
        maxLength={1}
        minLength={1}
        onChange={getInputValue}
      />
    );
  });

//Handles the reset stats button in configurations
  const handleResetStats = () => {
    setGamesWon(0);
    setGamesLost(0);
  };

  return (
    <div className="game">
      <NavBar
        secretCode={secretCode}
        handleResetStats={handleResetStats}
        restartGame={restartGame}
        handleLevelChange={handleLevelChange}
        resetGuesses={resetGuesses}
        allUserGuesses={allUserGuesses}
        gameLevel={gameLevel}
      />
      <div className="guess-input-section">
        {gameOver && isOpen && (
          <dialog className={winGame ? "dialog-win" : "dialog-lose"} open>
            <a href="#" className="close" onClick={handleShowModal}></a>
            {winGame ? (
              <div className="win-statement">
                <p className="win-or-lose">You Won!!!</p>
                <p>The secret code was:</p>
                <div className="single-row">{secretColors()}</div>{" "}
              </div>
            ) : (
              <div className="lose-statement">
                <p className="win-or-lose">You Lost ;(</p>
                <p>The secret code was:</p>
                <div className="single-row">{secretColors()}</div>{" "}
              </div>
            )}
            <button className="button-57 restart-button" onClick={restartGame}>
              {" "}
              <span className="text">Restart Game</span>
              <span>Ready?</span>
            </button>
          </dialog>
        )}
        <Results
          gamesWon={gamesWon}
          gamesLost={gamesLost}
          allUserGuesses={allUserGuesses}
          guessesLeft={guessesLeft}
        />
        <section className="guess-input-section">
          <BoardGame
            allUserGuesses={allUserGuesses}
            secretCode={secretCode}
            colors={colors}
            allHints={hints}
            guessesLeft={guessesLeft}
          />
        </section>

        <form className="form-section input-form" onSubmit={onSubmit}>
          {fullForm}
          {winGame || gameOver ? (
            <button className="button-57" id="submitBtn" onClick={restartGame}>
              {" "}
              <span className="text">Restart Game</span>
              <span>Ready?</span>
            </button>
          ) : (
            <button
              className="button-57"
              role="button"
              type="submit"
              id="submitBtn"
              title="Submit My Guess!"
              disabled={winGame || gameOver}
            >
              <span className="text">Submit</span>
              <span>You Sure?</span>
            </button>
          )}
        </form>
        <div ref={bottomOfPageRef} />
      </div>
    </div>
  );
};

export default GameContainer;
