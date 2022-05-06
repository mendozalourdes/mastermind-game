import React from 'react';

const Hints = ({singleHint}) => {


    return (
        <div className="hint-section">
            <p className={(singleHint === 'exact-match') ? 'exact-match': (singleHint === 'almost-match') ? 'almost-match' :'nope' }>{(singleHint === 'exact-match') ? '🟢': (singleHint === 'almost-match') ? '🟡' : '🔴'} </p>
        </div>
    );
};

export default Hints;

