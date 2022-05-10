import React from "react";
import { useState, useEffect } from "react";
import { colors } from "../Utils/colors";

const NavBar = (props) => {
  const [instructionsIsOpen, setinstructionsIsOpen] = useState(false);
  const [configurationsIsOpen, setConfigurationsIsOpen] = useState(false);

  //Handles the change of difficulty option
  const handleChange = (event) => {
    props.resetGuesses([], event);
    props.handleLevelChange(event.target.value);
    setConfigurationsIsOpen(!configurationsIsOpen);
  };

  return (
    <div className="full-nav-bar">
      <div className="navigation-bar">
        <section className="instructions configurations">
          <div className="nav-buttons">
            <button
              type="button"
              className="collapsible "
              onClick={() => setConfigurationsIsOpen(!configurationsIsOpen)}
            >
              Configurations
            </button>
            <button
              type="button"
              className="collapsible "
              onClick={() => setinstructionsIsOpen(!instructionsIsOpen)}
            >
              How To Play:
            </button>
          </div>
          <div
            className={configurationsIsOpen ? "content show rules" : "content"}
          >
            <p className="underline">Change Difficulty Level</p>
            <form className="difficulty-form" onChange={handleChange}>
              <select className="difficulty-form">
                <option className="basic-option" value="basic">
                  Basic
                </option>
                <option className="difficult-option" value="difficult">
                  Difficult
                </option>
              </select>
            </form>
            <div className="configuration-buttons">
              <p className="underline">Reset Your Stats</p>
              <p className="underline">Restart Game</p>
            </div>
            <div className="configuration-buttons">
              <button className="button-57" onClick={props.handleResetStats}>
                {" "}
                <span className="text">Reset Stats</span>
                <span>Fresh Start, Let's Go!</span>
              </button>
              <button
                className="button-57 restart-button"
                onClick={props.restartGame}
              >
                <span className="text">Restart Game</span>
                <span>Ready?</span>
              </button>
            </div>
          </div>
        </section>
        <ul className={instructionsIsOpen ? "content show rules" : "content"}>
          <p className="underline">Rules</p>
          <li>
            1. Computer will generate a four or six digit code, player's choice.{" "}
          </li>
          <li>
            2. Player attempts to guess the code, inputting guess into the form.
          </li>
          <li>
            3. Computer will display how many correct values were in the guess,
            and how many of those values were in the correct placement via
            hints. ( 🟢 🟡 🔴 )
          </li>
          <li>4. Player will have 10 opportunites to submit a guess. </li>
          <li>
            5. Computer will let player know once player has input the correct
            guess and WINS the game, or if player has lost the round.
          </li>
          <li>
            6. Computer will offer the player the opportunity to play again.
          </li>
          <li>
            PS: Hints do not reveal a correct guess until/unless code is broken.
          </li>
          <div className="expectations">
            <p className="underline">Hints</p>
            <p>
              The player had guessed a correct number and its correct location:
              🟢
            </p>

            <p>The player had guess a correct number : 🟡</p>
            <p>The player’s guess was incorrect: 🔴</p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
