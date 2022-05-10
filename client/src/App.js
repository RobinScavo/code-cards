import Header from './components/header/Header';
import Footer from './components/footer/Footer.js';
import DeckContainer from './components/deckContainer/DeckContainer';
import FilterContainer from './components/filterContainer/FilterContainer'
// import LoginModal from './components/loginModal/LoginModal.js';

import './app.css';

function App() {

  return (
    <div className="App">
      {/* <div className="overlay hidden"></div> */}
      {/* <LoginModal /> */}
      <Header />
      <FilterContainer />
      <DeckContainer />
      {/* <div className="content">
        <h1>Public Decks</h1>
      </div> */}
      <Footer />
    </div>
  );
}

export default App;
