import React from "react";
import { colors } from "../Utils/colors";
const { useState, useEffect, useRef } = React;

const Row = ({ allUserGuesses, id, oneHint }) => {
  const eachGuessColor = () => {
    return allUserGuesses.map((guess, i) => {
      return <div key={i + 1} id={i + 1} className={" circle demo " + colors[guess]}>{guess}</div>;
    });
  };

  const eachHint = () => {
    return oneHint.map((singleHint, i) => {
      return (
        <div key={i + 1} id={i + 1} className="hint-section">
          <p
            className={
              singleHint === "exact-match"
                ? "exact-match"
                : singleHint === "almost-match"
                ? "almost-match"
                : "nope"
            }
          >
            {singleHint === "exact-match"
              ? "🟢"
              : singleHint === "almost-match"
              ? "🟡"
              : "🔴"}{" "}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="single-row">
      {11 - id}. {eachGuessColor()}
      <div className="hints-section">{eachHint()}</div>
    </div>
  );
};

export default Row;
