import { useState } from 'react';
import './App.css';
import Container from './components/container/Container';
import NewCardStack from './components/new-card-stack/NewCardStack';
import Decks from './components/decks/Decks';
import SelectedCard from './components/selected-deck/SelectedCard';

function App() {
const [selectedCard, setSelectedCard] = useState<{name:string, image:string} | null>(null)

const [change, setChange] = useState(false)


  return (
    <Container>
      <NewCardStack  change={change} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
      <SelectedCard  selectedCard={selectedCard}/>
      <Decks selectedCard={selectedCard} setSelectedCard={setSelectedCard} change={change} setChange={setChange}/>
    </Container>
  );
}

export default App;
