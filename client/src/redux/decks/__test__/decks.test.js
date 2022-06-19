import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockDeck } from '../../../../tools/utils';

import { initialState, getPrivateDeck, getPrivateDecks, getPublicDeck, getPublicDecks, createDeck, editDeck, deleteDeck } from '../../decks/decksSlice';

const getDecksResponse = [mockDeck, mockDeck, mockDeck]


const mockNetworkResponse = () => {
    const mock = new MockAdapter(axios());
    mock.onGet('/decks').reply(200, getDecksResponse)
}

const mockStore = configureStore([]);
const store = mockStore(initialState);


describe('auth slice', () => {
    test('should initially set state to null user, false actions and empty string', () => {
        const state = store.getState();

        expect(state.decks).toEqual([]);
        expect(state.isError).toEqual(false);
        expect(state.isSuccess).toEqual(false);
        expect(state.isLoading).toEqual(false);
        expect(state.message).toEqual('');
    });
})

describe('Decks redux state tests', () => {
    beforeAll(() => {
        mockNetworkResponse()
      })

    test('Should fetch all public decks at home page', async () => {
        const result = await store.dispatch(getPublicDecks());
        const decks = result.payload;
        console.log('CXCXCX', decks)

        expect(decks).toEqual(getDecksResponse)
    })
})
