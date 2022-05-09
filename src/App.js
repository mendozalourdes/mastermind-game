import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import GameContainer from "./Components/GameContainer";
import NavBar from "./Components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import loadingSpin from "./Images/loadingSpin.gif";

const App = () => {
  const [secretCode, setSecretCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // const [secretDifficultCode, setSecretDifficultCode] = useState("");
  const [gameLevel, setGameLevel] = useState("basic")


  const getBasicCode = () => {
    let url = `https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`;

    if(gameLevel === "basic"){
      axios
        .get(url)
        .then((response) => {
          return setSecretCode(response.data.split("\n").slice(0, 4).map(Number));
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

  useEffect(() => {
    console.log("gameLevel in use effect", gameLevel)
    getBasicCode();
    // getDifficultCode();
  }, [gameLevel]);

  const checkNumPlacement = (userGuess, secretNums) => {
     secretNums = [...secretCode]

    const checkPlacement = userGuess.reduce((acc, num, i) => {
      if (secretNums[i] === num) {
        acc++;
      }
      return acc;
    }, 0);

    return checkPlacement;
  };

  const checkCorrectNumsGuess = (userGuess, secret) => {
    secret = [...secretCode]

    let matches = [];

    for (let i = 0; i < userGuess.length; i++) {
      if (secret.includes(userGuess[i])) {
        matches.push(userGuess[i]);
        secret.splice(secret.indexOf(userGuess[i]), 1);
      }
    }

    return matches.length;
  };

  const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );
  
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);
  
    return [value, setValue];
  };

  const checkHints = (userGuess, secretCode) => {
    let secretCopy = [...secretCode];
    let guessCopy = [...userGuess];

    let hints = [];

    for (var i = 0; i < secretCode.length; i++) {
      if (userGuess[i] === secretCode[i]) {
        hints.push("exact-match");
        secretCopy.splice(secretCopy.indexOf(userGuess[i]), 1);
        guessCopy.splice(guessCopy.indexOf(userGuess[i]), 1);
      }
    }

    for (var j = 0; j < secretCode.length; j++) {
      if (secretCopy.includes(guessCopy[j])) {
        hints.push("almost-match");
        secretCopy.splice(secretCopy.indexOf(guessCopy[j]), 1);
      }
    }

    for (let i = 0; i <= secretCode.length; i++) {
      if (hints.length < secretCode.length) {
        hints.push("nope");
      }
    }
    return hints;
  };

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

  const handleLevelChange = (newValue) => {
    setGameLevel(newValue)
  }

  if (secretCode) {
    return (
      <main>
        <div className="App">
        <h1 className="title ">🏳️‍🌈MasterMind🏳️‍🌈!</h1>
          {/* <NavBar secretCode={secretCode} onChange={handleChange} gameLevel={gameLevel} /> */}
          <p>{secretCode}</p>
          <GameContainer
            secretCode={secretCode}
            gameLevel={gameLevel}
            checkNumPlacement={checkNumPlacement}
            checkCorrectNumsGuess={checkCorrectNumsGuess}
            getBasicCode={getBasicCode}
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
