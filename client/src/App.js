import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DeckContainer from './components/deckContainer/DeckContainer';
import DeckDetails from './components/deckDetails/DeckDetails';
import CreateDeck from './components/createDeck/CreateDeck';
import NotFound from './components/notFound/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';

import './app.scss';

function App() {

  return (
    <>
    <Router>
      <div className="App">
        <Header/>

        <Routes>
          {/* Public Decks */}
          <Route exact path='/decks' element = {
            <DeckContainer />
          } />
          <Route path={`/decks/:id`} element = {<DeckDetails />} />

          {/* Private Decks */}
          <Route exact path='/decks/privateDecks' element = {
            <DeckContainer privateDecks={true} />
          } />
          <Route path={`/decks/privateDecks/:id`} element = {
            <DeckDetails privateDeck={true}/>
          } />

          <Route path='/createDeck' element = {<CreateDeck />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element = {<NotFound />}/>
        </Routes>

        <Footer />
      </div>

    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
