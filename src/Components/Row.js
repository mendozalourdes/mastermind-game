import React from 'react';
import { colors } from "../Utils/colors";
import SingleBoardPiece from './SingleBoardPiece';
import Hints from './Hints';
const { useState, useEffect, useRef } = React;


const Row = ({color, allUserGuesses, guess, id, allHints, oneHint}) => {


           let oneGuess = allUserGuesses.map((num, i ) => {
                return  <SingleBoardPiece
                            key={"row_" + i}
                            id={i}
                            guess={guess}
                            allUserGuesses={allUserGuesses}
                            color={colors[num]}
                          />
        
        
            }
            )

    let singleHint = oneHint.map((hint, i ) => {
        return  <Hints
        key={i}
        id={i}
        singleHint={hint}
        oneHint={oneHint}
        allHints={allHints}
      />


      })

    return (
        <div className="single-row" >
            {11 - id}. {oneGuess}
            <div className="hints-section">

            {singleHint}
            </div>
        </div>
    );
};

export default Row;