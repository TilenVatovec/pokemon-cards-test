import React, { useState } from 'react';
import './Decks.css';
import Deck from '../deck/Deck';

export type PokeDeck = {
    image: string;
    name: string;
    status: string;
};


function Decks({change, setChange, selectedCard, setSelectedCard}:{change: boolean, setChange:(change: boolean) => void, setSelectedCard:(selectedCard: {name:string, image:string} | null) => void,  selectedCard: {name:string, image:string} | null}) {
 const [data, setData] = useState<PokeDeck[] | null>(null)

 const deck1 = data?.filter((data) => data.status === 'deck1')
 const deck2 = data?.filter((data) => data.status === 'deck2')
 const deck3 = data?.filter((data) => data.status === 'deck3')


 function handleDrop(e: React.DragEvent<HTMLDivElement>, status: string) {
    e.preventDefault();
    const pokemonData = e.dataTransfer.getData("pokemonData").split(",");
    if (pokemonData[0] !== "") {
        setData(prevData => {
            const newData = [...(prevData || []), { name: pokemonData[0], image: pokemonData[1], status }];
            return newData;
        });
        setChange(!change)
    }
    const pokemonName = e.dataTransfer.getData("pokemonName")

    if (pokemonName !== null) {
        setData(prevData => {
            return prevData!.map((pokemon) => {
                if(pokemon.name === pokemonName) return {...pokemon, status}
            return pokemon
            })
        });
    }
}

    return (
        <div className="play-container">
            <Deck deck={deck1 ?? []} status='deck1' handleDrop={handleDrop} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
            <Deck deck={deck2 ?? []} status='deck2' handleDrop={handleDrop} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
            <Deck deck={deck3 ?? []} status='deck3' handleDrop={handleDrop} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
        </div>
    );
}

export default Decks;
