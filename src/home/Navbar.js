// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const filters = [
    {
        image: "https://cdn.mobalytics.gg/assets/common/icons/all-option.svg",
        label: "All",
    },
    {
        image: "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-top-faded.svg",
        label: "Top",
    },
    {
        image: "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-jg-faded.svg",
        label: "Jungle",
    },
    {
        image: "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-mid-faded.svg",
        label: "Mid",
    },
    {
        image: "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-bot-faded.svg",
        label: "Bottom",
    },
    {
        image: "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-sup-faded.svg",
        label: "Support",
    },
];

function Navbar({ selectedFilter, onFilterClick }) {
    return (
        <div className="Navbar">
            {filters.map((filter, index) => (
                <img
                    key={index}
                    className={`filter-button ${selectedFilter === filter.label.toLowerCase() ? 'active' : ''}`}
                    src={filter.image}
                    alt={filter.label}
                    onClick={() => onFilterClick(filter.label.toLowerCase())}
                />
            ))}
        </div>
    );
}

export default Navbar;
