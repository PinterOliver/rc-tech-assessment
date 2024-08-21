import React from 'react';
import {Hero} from '../types';

interface HeroListItemProps {
    hero: Hero;
}

const HeroListItem: React.FC<HeroListItemProps> = ({hero}) => {
    return (
        <li>
            {hero.name}{hero.available ? ' "Available"' : ''}
        </li>
    );
};

export default HeroListItem;
