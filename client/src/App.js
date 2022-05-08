import { useRef } from 'react';

import Header from './components/header/Header';
import Footer from './components/footer/Footer.js';
import LoginModal from './components/loginModal/LoginModal.js';

import './app.css';

function App() {
  const container = useRef('App');
  console.log(container.current)

  return (
    <div ref={container} className="App">
      <div className="overlay hidden"></div>
      <LoginModal />
      <Header />
      <div className="content">
        <h1>Public Decks</h1>
      </div>
      <Footer />
    </div>
  );
}

export default App;
