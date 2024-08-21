import React, {useEffect, useState} from 'react';
import {callApi} from '../call-api';
import HeroListItem from './hero-list-item';
import {Hero} from '../types';
import ErrorMessage from '../error-message';
import LoadingMessage from '../loading-message';
import '../styles.css'; // Import the global CSS file

function HeroesList() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHeroes() {
            try {
                const heroesData = await callApi<Hero[]>('heroes');
                setHeroes(heroesData);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch heroes.');
                setLoading(false);
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

    if (loading) {
        return <LoadingMessage/>;
    }

    if (error) {
        return <ErrorMessage message={error}/>;
    }

    return (
        <div>
            <h2>Heroes</h2>
            <div className="container">
                <ul className="hero-list">
                    {heroes.map((hero) => (
                        <HeroListItem key={hero.id} hero={hero} onToggle={toggleAvailability}/>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HeroesList;
