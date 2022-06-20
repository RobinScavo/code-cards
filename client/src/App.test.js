import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'

// Import custom render function and built-in methods
import  { render, fireEvent, screen } from '../tools/test-utils';
import { mockDeck, secondMockDeck, thirdMockDeck } from '../tools/utils';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import Login from './pages/login/Login';
import DeckContainer from './pages/deckContainer/DeckContainer';
import Spinner from './components/spinner/Spinner';
import Header from './components/header/Header';

// const textFinder = (content, node) => {
//     screen.getByText(() => {
//         const hasText = (node) => node.textContent === content;
//         const nodeHasText = hasText(node);
//         const childrenDontHaveText = Array.from(node.children).every(
//             (child) => !hasText(child)
//         )

//         return nodeHasText && childrenDontHaveText;
//     })
// }


describe('initial load', () => {

    test('header should display "log-in or sign up"', () => {
        render(<Header />)

        expect(screen.getByText(/log in or sign up/i)).toBeInTheDocument()
    });

    test('should display spinner while fetching public decks', () => {
        render(<Spinner />)

        expect(screen.getByTestId('spinner')).toBeInTheDocument()
    });

    test('after fetching public decks, should display "public library" title', async () => {
        render(<DeckContainer />)

        expect(await screen.findByText(/public library/i)).toBeInTheDocument()
    })

    test('after fetching, should display public decks', async () => {
        render(<DeckContainer />)

        expect(await screen.findAllByTestId('deck')).toHaveLength(2)
    })
})

describe('log in', () => {
    test('upon clicking "log in/sign up" should render login page', async () => {
        render(<App />)

        let label = await screen.findByLabelText('URL Status');
        expect(label).toHaveTextContent('decks')
    })
})
