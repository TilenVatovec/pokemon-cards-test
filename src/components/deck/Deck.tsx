import React, { useEffect, useState } from 'react';
import './Deck.css';
import { capitalizeFirstLetter } from '../utils/capitaliseFirstLetter';

interface Pokemon {
    name: string;
    image: string;
}

function Deck ({setSelectedCard, selectedCard, change}:{setSelectedCard:(selectedCard: string | null) => void,  selectedCard: string | null , change:boolean}) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
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
            finally {
                setLoading(false)
            }
        };

        fetchPokemon();
    }, [change]);

    function handleDragStart(e: React.DragEvent<HTMLDivElement>, pokemonName: string, imgUrl: string) {
        const combinedData = `${pokemonName},${imgUrl}`;
        e.dataTransfer.setData("pokemonData", combinedData)
    }
    function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
        e.dataTransfer.clearData()
    }



    return (
        <div className='deck'>
            <div className='play-deck-container'>
                <h1>Card Stack</h1>
        
                    {pokemon && !isLoading ? (
                        <div draggable='true' onDragStart={(e) => handleDragStart(e, capitalizeFirstLetter(pokemon.name), pokemon.image)} onDragEnd={(e) => {handleDragEnd(e)} }  className='play-deck' onClick={() => setSelectedCard(pokemon.name ?? null)}>
                            <img height='100%' src={pokemon.image} alt={pokemon.name} />
                            <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
                        </div>
                    ) : (
                         <p>Loading...</p>
                    )}
             
            </div>
        </div>
    );
};

export default Deck;
