import React from "react";
import Row from "./Row";


const BoardGame = ({allUserGuesses, allHints, secretCode}) => {
  

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

const basicGameRows = []
    for (let i = 0; i < 10; i++) {
      basicGameRows.push(
          <div className="single-row">
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
          </div>

        )
    }

    const difficultGameRows = []
    for (let i = 0; i < 10; i++) {
      difficultGameRows.push(
          <div className="single-row">
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
            <div key={i + 1} id={i + 1} className={" circle demo " }>❓</div>
          </div>

        )
    }



  return <div className="board-game">
    {allUserGuesses.length ? everyGuessRow : (secretCode.length === 4 ? basicGameRows : difficultGameRows)}
      </div>;
};

export default BoardGame;
