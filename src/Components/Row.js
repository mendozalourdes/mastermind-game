import React from 'react';
import { colors } from "../Utils/colors";
import SingleBoardPiece from './SingleBoardPiece';
import Hints from './Hints';
const { useState, useEffect, useRef } = React;


const Row = ({color, allUserGuesses, guess, id, allHints, oneHint}) => {
console.log("allHints in row", allHints)
console.log("one hint in row ", oneHint)
    // console.log("allUserrrr", allUserGuesses)
    console.log("i am in row now")

           let oneGuess = allUserGuesses.map((num, i ) => {
                // console.log("color at num", colors[num])
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
            

    // let everyGuess = allUserGuesses.map((guess, i) => {
       
    //         for (let i = 0; i < guess.length; i++) {


    //        return  <SingleBoardPiece
    //                    key={"row_" + i}
    //                    id={i}
    //                    guess={guess}
    //                    allUserGuesses={allUserGuesses}
    //                    color={colors[guess[i]]}
    //                  />
   
   
    //    }
    //    ;
    //  });

    return (
        <div className="single-row" >
            {id}. {oneGuess}
            <div className="hints-section">

            {singleHint}
            </div>
        </div>
    );
};

export default Row;