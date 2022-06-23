import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DeckContainer from './pages/deckContainer/DeckContainer';
import CardContainer from './pages/cardContainer/CardContainer';
import CreateDeck from './components/createDeck/CreateDeck';
// import EditDeck from './components/editDeck/EditDeck';
import NotFound from './components/notFound/NotFound';
import Register from './pages/register/Register';
import Login from './pages/login/Login';


import './app.scss';

function App() {

  return (
    <>
    <Router>
      <div className="App">
        {/* <Header/> */}

        <Routes>
          <Route exact path='/' element={<Navigate to='/decks' />} />

          {/* Public Decks */}
          <Route exact path='/decks' element = {
            <>
            <Header
              showCreateButton = {true}
              showYourDecksButton = {true}
            />

            <DeckContainer />
            </>
          } />

          <Route path={`/decks/:id`} element = {
            <>
            <Header
              showHomeButton = {true}
              showCreateButton = {true}
              showYourDecksButton = {true}
              showUploadButton={true}
            />

            <CardContainer />
            </>
          } />

          {/* Private Decks */}
          <Route exact path='/decks/privateDecks' element = {
            <>
            <Header
              showHomeButton = {true}
              showCreateButton = {true}
            />

            <DeckContainer />
            </>
          } />

          <Route path={`/decks/privateDecks/:id`} element = {
            <>
            <Header
              showHomeButton = {true}
              showCreateButton = {true}
              showEditButton = {true}
              showUploadButton = {false}
              showYourDecksButton = {true}
              showDeleteButton = {true}
              showPublishButton = {true}
            />

            <CardContainer />
            </>
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
