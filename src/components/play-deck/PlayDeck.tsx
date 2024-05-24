import React, { useState } from 'react';
import './PlayDeck.css';

export type Card = {
    image: string;
    name: string;
    status: string;
};


function PlayDeck({change, setChange}:{change: boolean, setChange:(change: boolean) => void}) {
 const [data, setData] = useState<Card[] | null>(null)
 const [tableName1, setTableName1] = useState<string | null>(null)
 const [tableName2, setTableName2] = useState<string | null>(null)

 const deck1 = data?.filter((data) => data.status === 'deck1')
 const deck2 = data?.filter((data) => data.status === 'deck2')


 function handleDrop(e: React.DragEvent<HTMLDivElement>, status: string) {
    setChange(!change)
    e.preventDefault();
    const pokemonData = e.dataTransfer.getData("pokemonData").split(",");
    if (pokemonData !== null) {
        setData(prevData => {
            const newData = [...(prevData || []), { name: pokemonData[0], image: pokemonData[1], status }];
            return newData;
        });
    }
}


    
    function handelDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    return (
        <div className="play-container">
            <div className='play-card-container' onDrop={(e) => {handleDrop(e, 'deck1')}} onDragOver={handelDragOver}>
                <input onChange={(e) => setTableName1(e.target.value)} type='text' value={tableName1 ?? 'Untitled Deck'} />
                <div className='play-cards'>
                    {deck1 && deck1.map((card, index) => (
                        <div key={index} className='play-card'>
                            <img height='100%' src={card.image} alt={card.name}/>
                            <h2>{card.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='play-card-container' onDrop={(e) => {handleDrop(e, 'deck2')}} onDragOver={handelDragOver}>
            <input 
            onChange={(e) => setTableName2(e.target.value)} 
            type='text' 
            value={tableName2?? 'Untitled Deck'} 
            style={{color: tableName2 === null? '#BCC4CC' : 'initial'}} 
            />

                <div className='play-cards'>
                    {deck2 && deck2.map((card, index) => (
                        <div key={index} className='play-card'>
                            <img height='100%' src={card.image} alt={card.name}/>
                            <h2>{card.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlayDeck;
