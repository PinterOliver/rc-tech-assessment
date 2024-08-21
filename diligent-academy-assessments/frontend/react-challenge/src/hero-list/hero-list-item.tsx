import React from 'react';
import {Hero} from '../types';

interface HeroListItemProps {
    hero: Hero;
    onToggle: (id: number) => void;
}

const HeroListItem: React.FC<HeroListItemProps> = ({hero, onToggle}) => {
    return (
        <li onClick={() => onToggle(hero.id)} style={{cursor: 'pointer'}}>
            {hero.name}{hero.available ? ' "Available"' : ''}
        </li>
    );
};

export default HeroListItem;
