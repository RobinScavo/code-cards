import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/header/Header';
import Footer from './components/footer/Footer.js';
import DeckContainer from './components/deckContainer/DeckContainer';
import FilterContainer from './components/filterContainer/FilterContainer'
import LoginModal from './components/loginModal/LoginModal.js';
import DeckDetails from './components/deckDetails/DeckDetails';
import CreateDeck from './components/createDeck/CreateDeck';

import './app.css';

function App() {
  const [modalVisible, setModalVisible] =  useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <Router>
      <div className="App">
        <Header
          // loggedIn={loggedIn}
          toggleModal={toggleModal}
        />
        <FilterContainer />
        {modalVisible &&
          <LoginModal
            toggleModal={toggleModal}
            // setLoggedIn={setLoggedIn}
          />
        }

        <Routes>
          <Route exact path='/publicDecks' element = {
            <DeckContainer collection='publicDecks' />
          } />
          <Route path='/privateDecks' element = {
            <DeckContainer collection='privateDecks' />
          } />
          <Route path={`/publicDecks/:id`} element = {
            <DeckDetails />
          } />
          <Route path={`/privateDecks/:id`} element = {
            <DeckDetails />
          } />
          <Route path='/createDeck' element = {
            <CreateDeck />
          }>

          </Route>
        </Routes>

        <Footer />
      </div>

    </Router>
  );
}

export default App;
