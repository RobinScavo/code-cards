import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DeckContainer from './components/deckContainer/DeckContainer';
import DeckDetails from './components/deckDetails/DeckDetails';
import CreateDeck from './components/createDeck/CreateDeck';
import NotFound from './components/notFound/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';

import './app.css';
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
    <Router>
      <div className="App">
        <Header/>

        <Routes>
          <Route exact path='/publicDecks' element = {
            <DeckContainer collection='publicDecks' />
          } />
          <Route exact path='/privateDecks' element = {
            <DeckContainer collection='privateDecks' />
          } />
          <Route path={`/publicDecks/:id`} element = {<DeckDetails />} />
          <Route path={`/privateDecks/:id`} element = {<DeckDetails />} />
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
