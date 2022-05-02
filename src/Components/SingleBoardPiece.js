import React from "react";
import { colors } from "../Utils/colors";

const SingleBoardPiece = ({allUserGuesses, guess, id, color}) => {
//   let circles = [1, 2, 3, 4];
//   let everyGuess = allUserGuesses.map((guess, i) => {
//     return (
//         <SingleBoardPiece
//                 key={"row_" + i}
//                 id={"row_" + i}
//                 // className={"one-row circle" + " " + colors[guess[i]]}
//                 // guess={guess}
//                 // allUserGuesses={allUserGuesses}
//                 // userGuess = {userGuess}
//               />
//     );
//   });

  return <div className={" circle" + " " + color}></div>
};

export default SingleBoardPiece;
