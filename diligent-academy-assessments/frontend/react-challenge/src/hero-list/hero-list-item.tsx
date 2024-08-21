import React from 'react';
import {Hero} from '../types';
import '../styles.css';

interface HeroListItemProps {
    hero: Hero;
    onToggle: (id: number) => void;
}

const HeroListItem: React.FC<HeroListItemProps> = ({hero, onToggle}) => {
    return (
        <li
            className="hero-list-item"
            onClick={() => onToggle(hero.id)}
        >
            <div>
                <span>{hero.id}. </span>
                <span>{hero.name}</span>
                <span className="hero-availability">{hero.available ? ' "Available"' : ''}</span>
            </div>
        </li>
    );
};

export default HeroListItem;
