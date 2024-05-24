import { useState } from 'react';
import './App.css';
import Container from './components/container/Container';
import Deck from './components/deck/Deck';
import PlayDeck from './components/play-deck/PlayDeck';
import SelectedCard from './components/selected-deck/SelectedCard';

function App() {
const [selectedCard, setSelectedCard] = useState<{name:string, image:string} | null>(null)

const [change, setChange] = useState(false)


  return (
    <Container>
      <Deck  change={change} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
      <SelectedCard  selectedCard={selectedCard}/>
      <PlayDeck selectedCard={selectedCard} setSelectedCard={setSelectedCard} change={change} setChange={setChange}/>
    </Container>
  );
}

export default App;
