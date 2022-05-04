import React from "react";
import Row from "./Row";


const BoardGame = ({allUserGuesses, allHints}) => {
    console.log("hints in board game", allHints)
    // let allTheHings = [...allHints]

// let everyHint = allTheHings.map((hint, i) => {
//     return  <Row
//     key={"row_" + i}
//     id={i + 1}
//     allHints={allHints}
//     oneHint={hint}
//   />
// })

  let everyGuessRow = allUserGuesses.map((guess, i) => {
    
        return  <Row
                    key={"row_" + i}
                    id={i + 1}
                    guess={guess}
                    allUserGuesses={allUserGuesses[i]}
                    allHints={allHints}
                    oneHint={allHints[i]}
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
       {everyGuessRow}
       {/* {everyHint} */}
       {/* {allHints.length >= 1 && everyHint} */}
      </div>;
};

export default BoardGame;
