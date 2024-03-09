import React from 'react';

function ChampionList({ champions, onReroll, onLockIn }) {
    return (
        <div className="champion-list">
            {champions.map((champion, index) => (
                <div key={champion.key} className="champion-item">
                    <h3>{champion.name}</h3>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champion.image.full}`}
                        alt={`${champion.name} Champion`}
                    />
                    <div className="button-container">
                        <button onClick={() => onReroll(index)}>REROLL</button>
                        <button onClick={() => onLockIn(champion, index)}>LOCK IN</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChampionList;
