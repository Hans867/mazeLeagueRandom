import React from 'react';


function RandomRoll({ champions, onRoll }) {
    return (
        <div>
            <button onClick={onRoll}>ROLL</button>
        </div>
    );
}

export default RandomRoll;

