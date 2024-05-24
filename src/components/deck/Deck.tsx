import React, { useEffect, useState } from 'react';
import './Deck.css';
import { capitalizeFirstLetter } from '../utils/capitaliseFirstLetter';

interface Pokemon {
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



    function handleDragStart(e: React.DragEvent<HTMLDivElement>, pokemonName: string, imgUrl: string) {
        const combinedData = `${pokemonName},${imgUrl}`;
        e.dataTransfer.setData("pokemonData", combinedData);
    }

    function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
        e.dataTransfer.clearData();
        setQueue(prevQueue => prevQueue.slice(1));
    }

    const currentPokemon = queue[0]; 

    return (
        <div className='deck'>
            <div className='play-deck-container'>
                <h1>Card Stack</h1>
                {currentPokemon ? (
                    <div draggable='true'
                        onDragStart={(e) => handleDragStart(e, currentPokemon.name, currentPokemon.image)}
                        onDragEnd={(e) => { handleDragEnd(e); }}
                        className='play-deck'
                        style={selectedCard === currentPokemon.name? { border: '2px solid #7B93FF', borderRadius: '8px' } : {}}
                        onClick={() => setSelectedCard(currentPokemon.name?? null)}>
                        <img height='100%' src={currentPokemon.image} alt={currentPokemon.name} />
                        <h2>{capitalizeFirstLetter(currentPokemon.name)}</h2>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Deck;
