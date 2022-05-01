import React from 'react';
import SingleBoardPiece from './SingleBoardPiece';
import { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';


const GuessInput = ({secretCode}) => {

    let colors = {
        0: 'green',
        1: 'red',
        2: 'blue',
        3: 'yellow',
        4: 'purple',
        5: 'pink',
        6: 'magenta',
        7: 'orange'
      }

    const [userGuess, setUserGuess] = useState(null)
    const [finalUserGuess, setFinalUserGuess] = useState(null)
    const [allUserGuesses, setAllUserGuesses] = useState([])
    // const [user]

    const onSubmit = (event) => {
        event.preventDefault();
        // setFinalUserGuess(Object.values(userGuess))
        console.log("guesssss", userGuess)
        console.log("userGuess", Object.values(userGuess))
        console.log("object", Object.entries(userGuess))
        setAllUserGuesses([...allUserGuesses, Object.values(userGuess)])

        //need to clear fields after submit. 
        clearInputs(event)
        //this is where i need to 


    }

    const getInputValue = (event)=>{
        const numberValue = parseInt(event.target.value)
        setUserGuess({
            ...userGuess,
            [event.target.name]: numberValue
          });

        //   console.log("state", state)
    // console.log("objectValues", Object.values(state))
    // console.log('mapppp', Object.values(state).map(num => parseInt(num)))
    // setUserGuess(Object.values(state).map(num => parseInt(num)))
    // console.log("userGuess" , userGuess)

    };

    const clearInputs = (event) => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
        setUserGuess(null);
 
      };

    let allCircles = Object.values(colors).map((color, i) => {
        console.log("color?", color, i)
        return (
            <section className="circles-numbers">
                <div className={"one-row circle demo" + " " + color }></div>
                <p>{i + 1}</p>
            </section>
            )
    })

    let basicGame = [1, 2, 3, 4]
    let basicForm = basicGame.map((input, i) => {
        return (
            // <form id="inputForm" className="input-form" onSubmit={onSubmit} >
            <input
               className="num-input-all"
               type="text"
               name={input}
               id={i}
                min='0'
                max='7'
               onKeyPress={(event) => {
                   if (!/[0-7]/.test(event.key)) {
                       event.preventDefault();
                   }
               }}
               required 
               minLength={1} 
               maxLength={1}
            //    value={userGuess[i]}
               onChange={getInputValue}
            //    value=""
               />
                // </form>
        )
    })


    
    return (
    <div className="guess-input-section">
        <div className="rows input-row">
            {allCircles}
        </div>
    <form className="form-section input-form" onSubmit={onSubmit}>
         {basicForm}
    <button
        type="submit"
        className="submit-button"
        id="submitBtn"
    //   disabled={!this.state.guessReady}
    //   onClick={(event) => this.submitGuess(event)}
        title="Submit My Guess!"
        >
        Submit Guess!
    </button>
</form>

        </div>

 
            
  
    );
};

export default GuessInput;