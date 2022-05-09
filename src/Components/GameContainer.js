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
  getBasicCode,
  useLocalStorage, 
  checkHints, 
  handleInputChange,
  // getDifficultCode, 
  gameLevel, 
  handleLevelChange
}) => {
  const [userGuess, setUserGuess] = useState(null);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
  const [correctNumPlacement, setCorrectNumPlacement] = useState(null);
  const [correctNumsGuess, setCorrectNumsGuess] = useState(null);
  const [hints, setHints] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(10);
  const [gamesWon, setGamesWon] = useLocalStorage('gamesWon', 0)
  const [gamesLost, setGamesLost] = useLocalStorage('gamesLost', 0);
  const [winGame, setWinGame] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  // const [gameLevel, setGameLevel] = useState("basic")


  const bottomOfPageRef = useRef(null);
  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const myRefs= useRef([]);
console.log("myRefs", myRefs.current)

  console.log("gameLevel in container", gameLevel)

  useEffect(() => {
    bottomOfPageRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleShowModal = () => {
    setIsOpen(!isOpen);
  };

  const handleWin = () => {
    setGamesWon(gamesWon + 1);
    setWinGame(true);
    setGameOver(true);
    setIsOpen(true);
  };

  const handleLoss = () => {
    setGamesLost(gamesLost + 1);
    setGameOver(true);
    setIsOpen(true);
  };

  const restartGame = () => {
    getBasicCode();
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

  const getInputValue = (event) => {
    const inputValue = parseInt(event.target.value);
    handleInputChange(event);
    setUserGuess({
      ...userGuess,
      [event.target.name]: inputValue,
    });
  };

  const clearInputs = () => {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    setUserGuess(null);
  };

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

  const secretColors = () => {
    return secretCode.map((num, i) => {
      return (
        <div key={i} className={" circle demo " + colors[num]}>
          {num}
        </div>);});
  };

  const resetGuesses = (value) => {
    setAllUserGuesses(value)
    setHints(value)
  }

  let fullForm = secretCode.map((num, i) => {
    return (
        // <form id="inputForm" className="input-form" onSubmit={onSubmit} >
        <input
           className="num-input-all"
           type="text"
           name={`${"input-"+ i}`}
           id={i}
           key={i}
           min='0'
            max='7'
            // ref={"inputRef"+ i}
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
    )
})


  return (
    <div className="game">
          <NavBar secretCode={secretCode} handleLevelChange={handleLevelChange} resetGuesses={resetGuesses} allUserGuesses={allUserGuesses} gameLevel={gameLevel}  />
          {/* <p>{secretCode}</p>
          <p>{secretDifficultCode}</p> */}
    <div className="guess-input-section">
      {gameOver && isOpen && (
        <dialog className="dialog" open>
          <a href="#" className="close" onClick={handleShowModal}>      
          </a>
          {winGame ? (
            <p className="win-statement">
              <p className="win-or-lose">You Won!!!</p> 
              <p>The secret code was:</p>
              <div className="single-row">{secretColors()}</div>{" "}
            </p>
          ) : (
            <p className="lose-statement">
             <p className="win-or-lose">You Lost :(</p> 
              <p>The secret code was:</p>
              <div className="single-row">{secretColors()}</div>{" "}
            </p>
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
              <button className="button-57" onClick={restartGame}>
            {" "}
            <span className="text">Restart Game</span>
            <span>Ready?</span>
          </button>
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
        {/* <input
          className="num-input-all"
          type="text"
          name="input-1"
          id="0"
          key="0"
          min="0"
          max="7"
          ref={inputRef1}
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
        <input
          className="num-input-all"
          type="text"
          name="input-2"
          id="1"
          key="1"
          min="0"
          max="7"
          ref={inputRef2}
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
        <input
          className="num-input-all"
          type="text"
          name="input-3"
          id="2"
          key="2"
          min="0"
          max="7"
          ref={inputRef3}
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
        <input
          className="num-input-all"
          type="text"
          name="input-4"
          id="3"
          key="3"
          min="0"
          max="7"
          ref={inputRef4}
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
                <input
          className="num-input-all"
          type="text"
          name="input-5"
          id="4"
          key="4"
          min="0"
          max="7"
          ref={inputRef5}
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
                <input
          className="num-input-all"
          type="text"
          name="input-6"
          id="4"
          key="5"
          min="0"
          max="7"
          ref={inputRef5}
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
        /> */}

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
