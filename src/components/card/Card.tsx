import { Pokemon } from "../new-card-stack/NewCardStack";
import { capitalizeFirstLetter } from "../utils/capitaliseFirstLetter";

type PokemonProps = {
    pokemonName: string,
    pokemonUrl: string,
    setSelectedCard: (selectedCard: { name:string, image:string } | null) => void; 
    selectedCard: {name:string, image:string} | null
    setQueue?:React.Dispatch<React.SetStateAction<Pokemon[]>>
    isPlayDeck?: boolean
}


function Card({pokemonName, pokemonUrl, selectedCard, setSelectedCard, setQueue, isPlayDeck = false}:PokemonProps) {
    
    function handleDragStart(e: React.DragEvent<HTMLDivElement>, pokemonName: string, imgUrl: string) {
        if(!isPlayDeck) {
            const combinedData = `${pokemonName},${imgUrl}`;
            e.dataTransfer.setData("pokemonData", combinedData);
        } else {
            e.dataTransfer.setData("pokemonName", pokemonName)
        }
  
       

    }
    
    function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
        e.dataTransfer.clearData();
        if(setQueue !== undefined)setQueue(prevQueue => prevQueue.slice(1));
        
    }
    
    return   <div draggable='true'
                        onDragStart={(e) => handleDragStart(e, pokemonName, pokemonUrl)}
                        onDragEnd={(e) => { handleDragEnd(e); }}
                        className='play-deck'
                        style={selectedCard?.name === pokemonName ? { border: '2px solid #7B93FF', borderRadius: '8px' } : {}}
                        onClick={() => {setSelectedCard({name:pokemonName ?? null, image:pokemonUrl})}}>
                        <img height='100%' src={pokemonUrl} alt={pokemonName} />
                        <h2>{capitalizeFirstLetter(pokemonName)}</h2>
                    </div>
}

export default Card;