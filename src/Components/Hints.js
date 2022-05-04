import React from 'react';

const Hints = ({allUserGuessesLength, id, singleHint, oneHint, allHints}) => {
    console.log("allHints in hints", allHints)
    console.log("hint in hints ", oneHint)
    console.log("single hint in hints", singleHint)
    // console.log("hints sorted", hints.sort((a, b) => a - b))
    // let allHints = [...hints]

    // let showHints =
    
    // allHints.map((hint, i) => {
    //     console.log("hint", hints.indexOf(hint))
    //     if(!hint.length) {
    //         return <p>{hints.indexOf(hint) + 1}. You didn't get any correct :( </p>
    //     } else {
    //         return (
                
                
           
    let showHints =   oneHint.map((eachHint, i) => {
                 console.log("eachHint true or false", eachHint === 'almost-match', eachHint)
                
                 return <div className="hints">
                         <p className={(eachHint === 'exact-match') ? 'exact-match': (eachHint === 'almost-match') ? 'almost-match' :'nope' }>{allHints.indexOf(oneHint) + 1} {(eachHint === 'exact-match') ? '🟢': (eachHint === 'almost-match') ? '🟡' : '🔴'} </p>
                     </div>
                 
                 
     
             }
             
             )
    // )

    //     }


    // })

    return (
        <div className="hint-section">
            {/* {showHints} */}
            <p className={(singleHint === 'exact-match') ? 'exact-match': (singleHint === 'almost-match') ? 'almost-match' :'nope' }>{(singleHint === 'exact-match') ? '🟢': (singleHint === 'almost-match') ? '🟡' : '🔴'} </p>
        </div>
    );
};

export default Hints;

