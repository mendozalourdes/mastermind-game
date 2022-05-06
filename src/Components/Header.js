import React from "react";
import { useState } from "react";
import { colors } from "../Utils/colors";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  let allCircles = Object.values(colors).map((color, i) => {
    return (
      <section key={i} className="circles-numbers">
        <div key={i} className={"one-row circle demo" + " " + color}>{i}</div>
      </section>
    );
  });

  return (
    <div>
      <h1 className="title ">🏳️‍🌈MasterMind🏳️‍🌈!</h1>
      <section className="instructions">
        <button
          type="button"
          className="collapsible "
          onClick={() => setIsOpen(!isOpen)}
        >
          How To Play:
        </button>
        {/* <div className="rules">  */}
        <ul className={isOpen ? "content show rules" : "content"}>
          <li>1. Computer will generate a four digit code. </li>
          <li>
            2. Player attempts to guess the code, inputting guess into form.
          </li>
          <li>
            3. Computer will display how many correct values were included in
            the guess, as well as how many of those correct values were in the
            correct placement.
          </li>
          <li>4. Player will have 10 opportunites to submit a guess. </li>
          <li>
            5. Computer will let player know once player has input the correct
            guess and WINS the game, or if player has lost the round.{" "}
          </li>
          <li>
            6. Computer will offer the player the opportunity to play again.{" "}
          </li>
        </ul>
        <div className="rows input-row">{allCircles}</div>
      </section>
    </div>
  );
};

export default Header;
