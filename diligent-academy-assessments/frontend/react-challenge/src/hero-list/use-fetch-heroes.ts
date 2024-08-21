import {useEffect, useState} from 'react';
import {callApi} from '../call-api';
import {Hero} from '../types';

interface UseFetchHeroesResult {
    heroes: Hero[];
    loading: boolean;
    error: string | null;
}

const useFetchHeroes = (): UseFetchHeroesResult => {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const heroesData = await callApi<Hero[]>('heroes');
                setHeroes(heroesData);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch heroes.');
                setLoading(false);
            }
        };

        fetchHeroes();
    }, []);

    return {heroes, loading, error};
};

export default useFetchHeroes;
