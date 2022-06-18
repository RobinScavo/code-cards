import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DeckContainer from './pages/deckContainer/DeckContainer';
import DeckDetails from './pages/cardContainer/CardContainer';
import CreateDeck from './components/createDeck/CreateDeck';
import NotFound from './components/notFound/NotFound';
import Register from './pages/register/Register';
import Login from './pages/login/Login';


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
            <DeckContainer
              showCreateButton = {true}
              showYourDecksButton = {true}
            />
          } />

          <Route path={`/decks/:id`} element = {
            <DeckDetails
              showHomeButton = {true}
              showCreateButton = {true}
              showYourDecksButton = {true}
              showUploadButton={true}
            />
          } />

          {/* Private Decks */}
          <Route exact path='/decks/privateDecks' element = {
            <DeckContainer
              showHomeButton = {true}
              showCreateButton = {true}
            />
          } />

          <Route path={`/decks/privateDecks/:id`} element = {
            <DeckDetails
              showHomeButton = {true}
              showCreateButton = {true}
              showEditButton = {true}
              showUploadButton = {false}
              showYourDecksButton = {true}
              showDeleteButton = {true}
              showPublishButton = {true}
            />
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
