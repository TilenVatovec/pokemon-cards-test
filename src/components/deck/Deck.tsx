import React, { useEffect, useState } from 'react';
import './Deck.css';
import { capitalizeFirstLetter } from '../utils/capitaliseFirstLetter';
import Card from '../card/Card';

export type Pokemon  = {
    name: string;
    image: string;
}

function Deck({ setSelectedCard, selectedCard, change }: { setSelectedCard: (selectedCard: string | null) => void; selectedCard: string | null; change: boolean }) {
    const [queue, setQueue] = useState<Pokemon[]>([]);

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

            const offset = Math.floor(Math.random() * 500) + 1;
            const gqlVariables = {
                limit: 10,
                offset: offset,
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
                const newPokemons = result.data.pokemons.results;
                console.log(`🚀 ~ file: Deck.tsx:46 ~ newPokemons:`, newPokemons)
                setQueue(prevQueue => [...prevQueue,...newPokemons]);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            } 
        };

       if(queue.length === 0 || queue.length === 1) fetchPokemon();
    }, [change, queue]);

    useEffect(() => {
       if(selectedCard === null && queue.length) setSelectedCard(queue[0].name)
    },[queue])

    const currentPokemon = queue[0]; 

    return (
        <div className='deck'>
            <div className='play-deck-container'>
                <h1>Card Stack</h1>
                {currentPokemon ? (
                    <Card pokemonName={currentPokemon.name} pokemonUrl={currentPokemon.image} selectedCard={selectedCard} setSelectedCard={setSelectedCard} setQueue={setQueue}></Card>
          
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Deck;
