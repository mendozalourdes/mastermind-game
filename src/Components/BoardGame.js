import React from "react";
import Row from "./Row";


const BoardGame = ({allUserGuesses, allHints}) => {

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



  return <div className="board-game">
       {everyGuessRow}
      </div>;
};

export default BoardGame;
