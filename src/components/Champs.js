import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Champs.css';
import ChampionList from "../repositories/ChampionsList";


function ListChamps() {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        axios.get('https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json')
            .then(response => {
                console.log('Champion data fetched successfully:', response.data);
                const championsData = response.data.data;
                const championsArray = Object.values(championsData);
                setChampions(championsArray);
            })
            .catch(error => console.error('Error fetching champions:', error));
    }, []);

    return (
        <div className="Champion-container">
            <ChampionList champions={champions} />
        </div>
    );
}

export default ListChamps;
