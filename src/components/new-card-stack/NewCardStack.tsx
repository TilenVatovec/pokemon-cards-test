import React, { useEffect, useState } from 'react';
import './NewCardStack.css';
import Card from '../card/Card';

export type Pokemon  = {
    name: string;
    image: string;
}

function NewCardStack({ setSelectedCard, selectedCard, change }: 
    { setSelectedCard: (selectedCard: { name:string, image:string } | null) => void; 
    selectedCard: {name:string, image:string} | null; change: boolean }) {
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
                setQueue(prevQueue => [...prevQueue,...newPokemons]);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            } 
        };

       if(queue.length === 0 || queue.length === 1) fetchPokemon();
    }, [change, queue]);

    useEffect(() => {
       if(selectedCard === null && queue.length)
        { 
        setSelectedCard({name: queue[0].name, image: queue[0].image}) 
    }
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

export default NewCardStack;
