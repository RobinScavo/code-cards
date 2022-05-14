import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer.js';
import DeckContainer from './components/deckContainer/DeckContainer';
import DeckDetails from './components/deckDetails/DeckDetails';
import CreateDeck from './components/createDeck/CreateDeck';


import './app.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Header/>

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
