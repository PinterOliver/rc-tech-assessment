import React, { useState, useEffect } from 'react';
import { callApi } from './call-api';

interface Hero {
    id: number;
    name: string;
    available: boolean;
}

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

  return (
    <>
      <h2>Heroes</h2>
        <ul>
            {heroes.map((hero) => (
                <li key={hero.id}>
                    {hero.name}{hero.available ? ' "Available"' : ''}
                </li>
            ))}
        </ul>
    </>
  );
}

export default HeroesList;
