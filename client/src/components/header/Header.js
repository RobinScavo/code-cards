import './header.css'

const Header = () => {
    const openLoginModal = () => {
        // overlay.classList.remove('hidden');
    }

    return (
        <div className="header">
            <h1 className='title'>Code Cards</h1>
            <button className='btn loginButton' onClick={openLoginModal}>Log In</button>
        </div>
     );
}

export default Header;
