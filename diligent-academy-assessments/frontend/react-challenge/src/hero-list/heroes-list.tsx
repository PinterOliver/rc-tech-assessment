import React, {useEffect, useState} from 'react';
import {callApi} from '../call-api';
import HeroListItem from './hero-list-item';
import {Hero} from '../types';
import ErrorMessage from '../error-message';

function HeroesList() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHeroes() {
            try {
                const heroesData = await callApi<Hero[]>('heroes');
                setHeroes(heroesData);
            } catch (error) {
                console.error('Failed to fetch heroes: ', error);
                setError('Failed to fetch heroes.');
            }
        }

        fetchHeroes();
    }, []);

    const toggleAvailability = (id: number) => {
        setHeroes((prevHeroes) => {
            const heroIndex = prevHeroes.findIndex((hero) => hero.id === id);
            if (heroIndex === -1) return prevHeroes;

            const updatedHeroes = [...prevHeroes];
            updatedHeroes[heroIndex] = {
                ...updatedHeroes[heroIndex],
                available: !updatedHeroes[heroIndex].available,
            };

            return updatedHeroes;
        });
    };

    if (error) {
        return <ErrorMessage message={error}/>;
    }

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
