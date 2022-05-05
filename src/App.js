import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import GameContainer from "./Components/GameContainer";
import Header from "./Components/Header";
import Results from "./Components/Results";
import { useState, useEffect } from "react";
import axios from "axios";
import loadingSpin from "./Images/loadingSpin.gif";

const App = () => {
  const [secretCode, setSecretCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [secretDifficultCode, setSecretDifficultCode] = useState("");

  const getBasicCode = () => {
    let url = `https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`;
    axios
      .get(url)
      .then((response) => {
        return setSecretCode(response.data.split("\n").slice(0, 4).map(Number));
      })
      .then((response) => {
        return setIsLoading(false);
      })
      .catch((error) => setError(error.message));
  };

  const getDifficultCode = () => {
    let url = `https://www.random.org/integers/?num=5&min=0&max=7&col=1&base=10&format=plain&rnd=new`;
    axios
      .get(url)
      .then((response) => {
        return setSecretDifficultCode(
          response.data.split("\n").slice(0, 5).map(Number)
        );
      })
      .then((response) => {
        return setIsLoading(false);
      })
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    getBasicCode();
    getDifficultCode();
  }, []);

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

 


  if (secretCode) {
    return (
      <main>
        <div className="App">
          <Header />
          <p>{secretCode}</p>
          <p>{secretDifficultCode}</p>
          <GameContainer
            secretCode={secretCode}
            checkNumPlacement={checkNumPlacement}
            checkCorrectNumsGuess={checkCorrectNumsGuess}
            getBasicCode={getBasicCode}
          />
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main>
        <div className="App">
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
