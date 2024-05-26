import { useState } from "react";
import { PokeDeck } from "../decks/Decks";
import Card from "../card/Card";


type DeckProps = {
    handleDrop:(e:React.DragEvent<HTMLDivElement>, status: string ) => void;
    status: string
    deck: PokeDeck[];
    setSelectedCard: (selectedCard: { name:string, image:string } | null) => void; 
    selectedCard: {name:string, image:string} | null;
}



function Deck({deck, handleDrop, status, setSelectedCard, selectedCard}: DeckProps) {
    const [tableName, setTableName] = useState<string | null>(null)

    function handelDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }
    
    return  (
        <div  className='play-card-container' onDrop={(e) => handleDrop(e, status)} onDragOver={handelDragOver}>
            <input 
            onChange={(e) => setTableName(e.target.value)} 
            type='text' 
            value={tableName ?? 'Untitled Deck'} 
            style={{color: tableName === null? '#BCC4CC' : 'black'}} 
            />
            <div className='play-cards' >
                {deck && deck.map((card, index) => (
                    <Card key={index} pokemonName={card.name} pokemonUrl={card.image} selectedCard={selectedCard} setSelectedCard={setSelectedCard}  isPlayDeck={true}></Card>
                ))}
            </div>
        </div>
)
}

export default Deck;