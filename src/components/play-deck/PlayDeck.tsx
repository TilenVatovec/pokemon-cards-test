import React, { useState } from 'react';
import './PlayDeck.css';
import { capitalizeFirstLetter } from '../utils/capitaliseFirstLetter';
import Card from '../card/Card';

export type Card = {
    image: string;
    name: string;
    status: string;
};


function PlayDeck({change, setChange, selectedCard, setSelectedCard}:{change: boolean, setChange:(change: boolean) => void, setSelectedCard:(selectedCard: string | null) => void,  selectedCard: string | null}) {
 const [data, setData] = useState<Card[] | null>(null)
 const [tableName1, setTableName1] = useState<string | null>(null)
 const [tableName2, setTableName2] = useState<string | null>(null)

 const deck1 = data?.filter((data) => data.status === 'deck1')
 const deck2 = data?.filter((data) => data.status === 'deck2')


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
    console.log(`🚀 ~ file: PlayDeck.tsx:33 ~ pokemonName:`, pokemonName)
    if (pokemonName !== null) {
        setData(prevData => {
            return prevData!.map((pokemon) => {
                if(pokemon.name === pokemonName) return {...pokemon, status}
            return pokemon
            })
        });
    }
}


    
    function handelDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function handleDragStart(e: React.DragEvent<HTMLDivElement>, pokemonName: string) {
        e.dataTransfer.setData("pokemonName", pokemonName)
    }
    function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
        e.dataTransfer.clearData()
    }

    return (
        <div className="play-container">
            <div className='play-card-container' onDrop={(e) => {handleDrop(e, 'deck1')}} onDragOver={handelDragOver}>
                <input 
                onChange={(e) => setTableName1(e.target.value)} 
                type='text' 
                value={tableName1 ?? 'Untitled Deck'} 
                style={{color: tableName1 === null? '#BCC4CC' : 'initial'}} 
                />
                <div className='play-cards'>
                    {deck1 && deck1.map((card, index) => (
                        <div draggable key={index} className='play-card' style={selectedCard === card.name ? {border: '2px solid #7B93FF', borderRadius:'8px' }: {}} onClick={() => {setSelectedCard(card.name)}} onDragEnd={(e) => {handleDragEnd(e)}}  onDragStart={(e) => {handleDragStart(e, card.name)}}>
                            <img height='100%' src={card.image} alt={card.name}/>
                            <h2>{capitalizeFirstLetter(card.name)}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div  className='play-card-container' onDrop={(e) => {handleDrop(e, 'deck2')}} onDragOver={handelDragOver}>
            <input 
            onChange={(e) => setTableName2(e.target.value)} 
            type='text' 
            value={tableName2 ?? 'Untitled Deck'} 
            style={{color: tableName2 === null? '#BCC4CC' : 'black'}} 
            />

                <div className='play-cards' >
                    {deck2 && deck2.map((card, index) => (
                        <Card key={index} pokemonName={card.name} pokemonUrl={card.image} selectedCard={selectedCard} setSelectedCard={setSelectedCard}  isPlayDeck={true}></Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlayDeck;
