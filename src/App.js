import "./App.css";
import * as React from "react";
import GameContainer from "./Components/GameContainer";
import { useState, useEffect } from "react";
import axios from "axios";
import loadingSpin from "./Images/loadingSpin.gif";
import { colors } from "./Utils/colors";

const App = () => {
  const [secretCode, setSecretCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [gameLevel, setGameLevel] = useState("basic");

//Fetch call, depending on the game's level
  const getCode = () => {
    let url = `https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`;

    if (gameLevel === "basic") {
      axios
        .get(url)
        .then((response) => {
          return setSecretCode(
            response.data.split("\n").slice(0, 4).map(Number)
          );
        })
        .then((response) => {
          return setIsLoading(false);
        })
        .catch((error) => setError(error.message));
    } else if (gameLevel === "difficult") {
      url = `https://www.random.org/integers/?num=6&min=0&max=7&col=1&base=10&format=plain&rnd=new`;
      axios
        .get(url)
        .then((response) => {
          return setSecretCode(
            response.data.split("\n").slice(0, 6).map(Number)
          );
        })
        .then((response) => {
          return setIsLoading(false);
        })
        .catch((error) => setError(error.message));
    }
  };

//Updates whenever the gameLevel state is modified 
  useEffect(() => {
    getCode();
  }, [gameLevel]);

//Checks the placement of the number
  const checkNumPlacement = (userGuess, secretNums) => {
    secretNums = [...secretCode];

    const checkPlacement = userGuess.reduce((acc, num, i) => {
      if (secretNums[i] === num) {
        acc++;
      }
      return acc;
    }, 0);

    return checkPlacement;
  };

//Checks whether the guess included a correct number
  const checkCorrectNumsGuess = (userGuess, secret) => {
    secret = [...secretCode];

    let matches = [];

    for (let i = 0; i < userGuess.length; i++) {
      if (secret.includes(userGuess[i])) {
        matches.push(userGuess[i]);
        secret.splice(secret.indexOf(userGuess[i]), 1);
      }
    }

    return matches.length;
  };

//Checks how many hints are included in guess
  const checkHints = (userGuess, secretCode) => {
    let secretCopy = [...secretCode];
    let guessCopy = [...userGuess];
    
    let hints = [];
    
    for (let i = 0; i < secretCode.length; i++) {
      if (userGuess[i] === secretCode[i]) {
        hints.push("exact-match");
        secretCopy.splice(secretCopy.indexOf(userGuess[i]), 1);
        guessCopy.splice(guessCopy.indexOf(userGuess[i]), 1);
      }
    }
    
    for (let j = 0; j < secretCode.length; j++) {
      if (secretCopy.includes(guessCopy[j])) {
        hints.push("almost-match");
        secretCopy.splice(secretCopy.indexOf(guessCopy[j]), 1);
      }
    }
    
    for (let k = 0; k <= secretCode.length; k++) {
      if (hints.length < secretCode.length) {
        hints.push("nope");
      }
    }
    return hints;
  };
  
  //Updates local storage for wins/losses using a custom hook 
    const useLocalStorage = (storageKey, defaultState) => {
      const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(storageKey)) ?? defaultState
      );
  
      useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }, [value, storageKey]);
  
      return [value, setValue];
    };

//Handles the focus of the input fields 
  const handleInputChange = (event) => {
    const { maxLength, value, name } = event.target;
    const [fieldName, fieldIndex] = name.split("-");

    let fieldIntIndex = parseInt(fieldIndex, 10);

    if (value.length >= maxLength) {
      if (fieldIntIndex < secretCode.length) {
        const nextfield = document.querySelector(
          `input[name=input-${fieldIntIndex + 1}]`
        );
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  };

//Handles state for change of game level
  const handleLevelChange = (newValue) => {
    setGameLevel(newValue);
  };

//Creates a row of circles to represent color/number options
  let allCircles = Object.values(colors).map((color, i) => {
    return (
      <section key={i} className="circles-numbers">
        <div key={i} className={"one-row circle demo " + color}>
          {i}
        </div>
      </section>
    );
  });

  if (secretCode) {
    return (
      <main>
        <div className="App">
          <h1 className="title ">🏳️‍🌈MasterMind🏳️‍🌈</h1>
          <section className="description-section">
            <div className="description-row">{allCircles}</div>
          </section>
          <GameContainer
            secretCode={secretCode}
            gameLevel={gameLevel}
            checkNumPlacement={checkNumPlacement}
            checkCorrectNumsGuess={checkCorrectNumsGuess}
            getCode={getCode}
            useLocalStorage={useLocalStorage}
            checkHints={checkHints}
            handleInputChange={handleInputChange}
            handleLevelChange={handleLevelChange}
          />
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main>
        <div className="App">
          <h1 className="title ">🏳️‍🌈MasterMind🏳️‍🌈!</h1>
          <section className="loading-container flex flex-col justify-center ">
            <p className="loading-message title">Loading MasterMind Game </p>
            <img className="loading" src={loadingSpin} />
          </section>
        </div>
      </main>
    );
  }
};

export default App;
