import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/header/Header';
import Footer from './components/footer/Footer.js';
import DeckContainer from './components/deckContainer/DeckContainer';
import FilterContainer from './components/filterContainer/FilterContainer'
import LoginModal from './components/loginModal/LoginModal.js';

import './app.css';

function App() {
  const [modalVisible, setModalVisible] =  useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <Router>
      <div className="App">
        <Header toggleModal={toggleModal}/>
        <FilterContainer />
        {modalVisible &&
          <LoginModal toggleModal={toggleModal}/>
        }

        <Routes>
          <Route exact path='/' element = {
            <DeckContainer collection='publicDecks' />
          } />
          <Route path='/privateDecks' element = {
            <DeckContainer collection='privateDecks' />
          } />
        </Routes>

        <Footer />
      </div>

    </Router>
  );
}

export default App;
