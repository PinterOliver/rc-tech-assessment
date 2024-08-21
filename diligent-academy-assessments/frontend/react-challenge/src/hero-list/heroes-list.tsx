import React, {useEffect, useState} from 'react';
import HeroListItem from './hero-list-item';
import {Hero} from '../types';
import ErrorMessage from '../error-message';
import LoadingMessage from '../loading-message';
import useFetchHeroes from './use-fetch-heroes';
import '../styles.css';

function HeroesList() {
    const {heroes, loading, error} = useFetchHeroes();
    const [localHeroes, setLocalHeroes] = useState<Hero[]>([]);

    useEffect(() => {
        setLocalHeroes(heroes);
    }, [heroes]);

    const toggleAvailability = (id: number) => {
        setLocalHeroes((prevHeroes) => {
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
                    {localHeroes.map((hero) => (
                        <HeroListItem key={hero.id} hero={hero} onToggle={toggleAvailability}/>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HeroesList;
