import React, { useEffect, useState } from 'react';
import './SelectedCard.css';
import { capitalizeFirstLetter } from '../utils/capitaliseFirstLetter';

interface PokemonData {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: Array<{type: {name: string}}>;
}

function SelectedCard({selectedCard}: { selectedCard: string | null}) {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedCard}`);
                if (!response.ok) throw new Error("Network response was not ok");
                const data: PokemonData = await response.json();
                setPokemon(data);
            } catch (error) {
                console.error("Failed to fetch Pokémon data:", error);
            }
        };
        if (selectedCard) fetchPokemonData();
    }, [selectedCard]);

    return (
        <div className='selected-card'>
            {pokemon? (
                <>
                    <img width='100%' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                    <div className='selected-card-data'>
                        <div className='selected-card-info-frame'>
                            <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
                            <div className='selected-card-type'>
                                {pokemon.types.map(type => (
                                    <h3 key={type.type.name}>{capitalizeFirstLetter(type.type.name)}</h3>
                                ))}
                            </div>
                        </div>
                        <h4><span>#</span>{pokemon.id}</h4>
                    </div>
                    <div className='selected-card-info-frame-2'>
                        <h4>{pokemon.height * 10}<span>CM</span></h4>
                        <h4>{pokemon.weight / 10}<span>KG</span></h4>
                    </div>
                </>
            ) : (
                <div className='loading'><p>Loading...</p></div>
        
            )}
        </div>
    );
};

export default SelectedCard;
