import axios from 'axios';

const PRIVATE_URL = 'http://localhost:8080/privateDecks/'

const getPublicDecks = async () => {
    const response = await axios.get('http://localhost:8080/publicDecks/')

    console.log('PUBLIC SERVICE', response.data)
    return response.data;
}

const getPrivateDecks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(PRIVATE_URL, config);
    console.log('DECK SERVICE', response.data)

    return response.data
}

const createDeck = async (deckData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log('******', deckData, config)
    const response = await axios.post(PRIVATE_URL, deckData, config)

    return response.data
}

const deleteDeck = async (deckId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(PRIVATE_URL + deckId, config)

    return response.data
}

const decksService = {
    getPublicDecks,
    getPrivateDecks,
    createDeck,
    deleteDeck
}

export default decksService
