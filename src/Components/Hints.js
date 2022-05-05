import React from 'react';

const Hints = ({allUserGuessesLength, id, singleHint, oneHint, allHints}) => {


    return (
        <div className="hint-section">
            {/* {showHints} */}
            <p className={(singleHint === 'exact-match') ? 'exact-match': (singleHint === 'almost-match') ? 'almost-match' :'nope' }>{(singleHint === 'exact-match') ? '🟢': (singleHint === 'almost-match') ? '🟡' : '🔴'} </p>
        </div>
    );
};

export default Hints;

