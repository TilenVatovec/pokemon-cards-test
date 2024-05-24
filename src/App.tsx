import './App.css';
import Container from './components/container/Container';
import Deck from './components/deck/Deck';
import PlayDeck from './components/play-deck/PlayDeck';
import SelectedCard from './components/selected-deck/SelectedCard';

function App() {
  return (
    <Container>
      <Deck />
      <SelectedCard />
      <PlayDeck />
    </Container>
  );
}

export default App;
