import React from 'react';
import { useState } from 'react';


const Header = () => {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div>
        <h1 className="title ">
        🏳️‍🌈MasterMind🏳️‍🌈!
        </h1>
        <section className="instructions">
        <button 
        type="button" 
        className="collapsible "
        onClick={() => setIsOpen(!isOpen)}
        >How To Play:</button>
        {/* <div className="rules">  */}
        <div className= {isOpen ? 'content show rules' : 'content'}>
            <p>1. Computer will generate a four digit code. </p>
                <p>2. Player attempts to guess the code, inputting guess into form.</p>
                <p>3. Computer will display how many correct values were included in the guess, as well as how many of those correct values were in the correct placement.</p>
                <p>4. Player will have 10 opportunites to submit a guess. </p>
                <p>5. Computer will let player know once player has input the correct guess and WINS the game, or if player has lost the round.  </p>
                <p>6. Computer will offer the player the opportunity to play again. </p>
        </div>

        {/* </div> */}

        </section>

        </div>
    );
};

export default Header;