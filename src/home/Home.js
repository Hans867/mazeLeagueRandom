import React, { useState, useEffect } from 'react';
import './Home.css';
import ChampionList from '../repositories/ChampionsList';
import Navbar from "./Navbar";
import topChampions from '../repositories/TopChampions';
import jungleChampions from '../repositories/JungleChampions';
import midChampions from '../repositories/MidChampions';
import bottomChampions from '../repositories/ButtomChampions';
import supportChampions from '../repositories/SupportChampions';

const Home = () => {
    const [champions, setChampions] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [rolledChampions, setRolledChampions] = useState([]);
    const [rollCount, setRollCount] = useState(1);
    const [playerName, setPlayerName] = useState('');
    const [activeSide, setActiveSide] = useState('blue');
    const [leftLockedChampions, setLeftLockedChampions] = useState([]);
    const [rightLockedChampions, setRightLockedChampions] = useState([]);

    useEffect(() => {
        fetchChampions();
    }, []);


    const fetchChampions = async () => {
        try {
            const response = await fetch(
                'https://ddragon.leagueoflegends.com/cdn/15.3.1/data/en_US/champion.json'
            );
            const data = await response.json();
            const championData = Object.values(data.data);
            setChampions(championData);
        } catch (error) {
            console.error('Error fetching champion data:', error);
        }
    };

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
        // Fetch champions based on the selected filter
        fetchChampions(filter);
    };

    const handleRoll = () => {
        let filteredChampions = [];

        switch (selectedFilter) {
            case 'top':
                filteredChampions = topChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            case 'jungle':
                filteredChampions = jungleChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            case 'mid':
                filteredChampions = midChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            case 'bottom':
                filteredChampions = bottomChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            case 'support':
                filteredChampions = supportChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            default:
                // If the default filter is 'all', use all champions
                filteredChampions = champions;
                break;
        }

        // Filter out undefined entries
        filteredChampions = filteredChampions.filter(Boolean);

        const shuffledChampions = [...filteredChampions].sort(() => Math.random() - 0.5);
        const newRolledChampions = shuffledChampions.slice(0, rollCount);
        setRolledChampions(newRolledChampions);
    };
    /*
    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setSelectedFilter(selectedFilter);

        // Fetch champions based on the selected filter
        fetchChampions(selectedFilter);
    };

     */

    const getRandomChampion = (filter) => {
        let filteredChampions = [];

        switch (filter) {
            case 'top':
                filteredChampions = topChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            case 'jungle':
                filteredChampions = jungleChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            case 'mid':
                filteredChampions = midChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            case 'bottom':
                filteredChampions = bottomChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            case 'support':
                filteredChampions = supportChampions.map(championObject => champions.find(champion => champion.name.toLowerCase() === championObject.name.toLowerCase()));
                break;
            default:
                // If the default filter is 'all', use all champions
                filteredChampions = champions;
                break;
        }

        // Filter out undefined entries
        filteredChampions = filteredChampions.filter(Boolean);

        return filteredChampions[Math.floor(Math.random() * filteredChampions.length)];
    };

    const handleReroll = index => {
        setRolledChampions(prevRolledChampions => {
            const newRolledChampions = [...prevRolledChampions];
            let newChampion;

            do {
                newChampion = getRandomChampion(selectedFilter);
            } while (newRolledChampions.some(champion => champion.name === newChampion.name));

            newRolledChampions[index] = newChampion;
            return newRolledChampions;
        });
    };


    const handleLockIn = (champion, index) => {
        const newLockedChampion = {
            champion,
            playerName,
        };

        if (activeSide === 'blue') {
            setLeftLockedChampions(prev => [...prev, newLockedChampion]);
        } else {
            setRightLockedChampions(prev => [...prev, newLockedChampion]);
        }

        setRolledChampions([]); // Reset rolled champions when locking in
        setPlayerName(''); // Reset player name when locking in
    };

    const switchActiveSide = side => {
        setActiveSide(side);
    };

    return (
        <div>
            <h1>
                <img id="headline-image"
                     src="./pictures/titlemazeleaguerandom.png"
                     alt="MAZE LEAGUE RANDOM"
                     style={{ width: '60%', height: 'auto' }}
                />
            </h1>
            <Navbar selectedFilter={selectedFilter} onFilterClick={handleFilterClick} />
            <div id="gamerName">
                <button
                    className={`lock-in-button blue ${activeSide === 'blue' ? 'active' : ''}`}
                    onClick={() => switchActiveSide('blue')}
                >
                    BLUE
                </button>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />

                <button
                    className={`lock-in-button red ${activeSide === 'red' ? 'active' : ''}`}
                    onClick={() => switchActiveSide('red')}
                >
                    RED
                </button>
            </div>
            <div className="label-and-filter">
                <label>NUMBER OF CHAMPIONS TO ROLL </label>
                <select className="filter-select" onChange={(e) => setRollCount(parseInt(e.target.value))} value={rollCount}>
                    {[1, 2, 3, 4, 5].map(count => (
                        <option key={count} value={count}>
                            {count}
                        </option>
                    ))}
                </select>
            </div>
            <button className="roll-button" onClick={handleRoll}>
                ROLL
            </button>
            <ChampionList champions={rolledChampions} onReroll={handleReroll} onLockIn={handleLockIn} />
            <div className="locked-champions both-side">
                {leftLockedChampions.length > 0 && (
                    <div className="locked-champions blue-side">
                        <h2>Blue Side</h2>
                        {leftLockedChampions.map((lockedChampion, index) => (
                            <div key={index} className="locked-champion">
                                <p>{` ${lockedChampion.playerName}`}</p>
                                <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${lockedChampion.champion.image.full}`}
                                    alt={`${lockedChampion.champion.name} Champion`}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {rightLockedChampions.length > 0 && (
                    <div className={`locked-champions red-side${leftLockedChampions.length > 0 ? ' align-right' : ''}`}>
                        <h2>Red Side</h2>
                        {rightLockedChampions.map((lockedChampion, index) => (
                            <div key={index} className="locked-champion">
                                <p>{` ${lockedChampion.playerName}`}</p>
                                <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${lockedChampion.champion.image.full}`}
                                    alt={`${lockedChampion.champion.name} Champion`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default Home;
