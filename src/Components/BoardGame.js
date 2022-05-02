import React from "react";
import SingleBoardPiece from "./SingleBoardPiece";
import { useState } from "react";
import { colors } from "../Utils/colors";
import Row from "./Row";


const BoardGame = ({allUserGuesses, secretCode}) => {

  let everyGuessRow = allUserGuesses.map((guess, i) => {
    
        return  <Row
                    key={"row_" + i}
                    id={i}
                    guess={guess}
                    allUserGuesses={allUserGuesses[i]}
                  />

  
})


//   const totalRows = [];
//   for (let i = 0; i < 10; i++) {
//     totalRows.push(
//       <Row
//         key={"row_" + i}
//         id={"row_" + i}
//         // userGuess = {userGuess}
//       />
//     );
//   }

  return <div className="board-game">
       {/* <div className="one-guess-section">  */}
       {everyGuessRow}
      
      </div>;
};

export default BoardGame;
