import React from 'react';
import { colors } from "../Utils/colors";
import SingleBoardPiece from './SingleBoardPiece';
const { useState, useEffect, useRef } = React;


const Row = ({color, allUserGuesses, guess, id}) => {

    // console.log("allUserrrr", allUserGuesses)

           let oneGuess = allUserGuesses.map((num, i ) => {
                console.log("nummmm", num)
                // console.log("color at num", colors[num])
                return  <SingleBoardPiece
                            key={"row_" + i}
                            id={i}
                            guess={guess}
                            allUserGuesses={allUserGuesses}
                            // userGuess = {userGuess}
                            color={colors[num]}
                          />
        
        
            }
            )
            

    let everyGuess = allUserGuesses.map((guess, i) => {
       
            for (let i = 0; i < guess.length; i++) {


           return  <SingleBoardPiece
                       key={"row_" + i}
                       id={i}
                       guess={guess}
                       allUserGuesses={allUserGuesses}
                       color={colors[guess[i]]}
                     />
   
   
       }
       ;
     });

    return (
        <div className="single-row" >
            {oneGuess}
        </div>
    );
};

export default Row;