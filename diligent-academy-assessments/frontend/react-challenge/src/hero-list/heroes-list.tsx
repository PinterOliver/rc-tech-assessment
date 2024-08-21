import React, {useEffect, useState} from 'react';
import {callApi} from '../call-api';
import HeroListItem from './hero-list-item';
import {Hero} from '../types';

function HeroesList() {
    const [heroes, setHeroes] = useState<Hero[]>([]);

    useEffect(() => {
        async function fetchHeroes() {
            try {
                const heroesData = await callApi<Hero[]>('heroes');
                setHeroes(heroesData);
            } catch (error) {
                console.error('Failed to fetch heroes: ', error);
            }
        }

        fetchHeroes();
    }, []);

    const toggleAvailability = (id: number) => {
        setHeroes((prevHeroes) =>
            prevHeroes.map((hero) =>
                hero.id === id ? {...hero, available: !hero.available} : hero
            )
        );
    };

    return (
        <>
            <h2>Heroes</h2>
            <ul>
                {heroes.map((hero) => (
                    <HeroListItem key={hero.id} hero={hero} onToggle={toggleAvailability}/>
                ))}
            </ul>
        </>
    );
}

export default HeroesList;
