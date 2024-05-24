import React, { useEffect, useState } from 'react';
import './Deck.css';

interface Pokemon {
    name: string;
    image: string;
}

const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const Deck: React.FC = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            const gqlQuery = `
                query pokemons($limit: Int, $offset: Int) {
                    pokemons(limit: $limit, offset: $offset) {
                        results {
                            name
                            image
                        }
                    }
                }
            `;

            const gqlVariables = {
                limit: 1,
                offset: Math.floor(Math.random() * 1000), // Random offset for random Pokémon
            };

            try {
                const response = await fetch('https://graphql-pokeapi.graphcdn.app/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: gqlQuery,
                        variables: gqlVariables,
                    }),
                });

                const result = await response.json();
                const randomPokemon = result.data.pokemons.results[0];
                setPokemon(randomPokemon);
            } catch (error) {
                console.error('Error fetching Pokémon:', error);
            }
        };

        fetchPokemon();
    }, []);

    return (
        <div className='deck'>
            <div className='play-deck-container'>
                <h1>Card Stack</h1>
                <div className='play-deck'>
                    {pokemon ? (
                        <>
                            <img height='100%' src={pokemon.image} alt={pokemon.name} />
                            <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Deck;
