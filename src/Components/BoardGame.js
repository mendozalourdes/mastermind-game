import React from 'react';
import SingleBoardPiece from './SingleBoardPiece';
import { useState } from 'react';


const BoardGame = () => {

    const [isOpen, setIsOpen] = useState(false);

    const totalRows = []
    for (let i = 0; i < 10; i++) {
        totalRows.push(
            <SingleBoardPiece
            key={'row_' + i}
            id={'row_' + i}
            // userGuess = {userGuess}
            />
        )
    }


    return (
        <div className="board-game">
            {totalRows}
        </div>
    );
};

export default BoardGame;