import axios from 'axios';

const API_URL = 'http://localhost:8080/publicDecks/'

const fetchDecks = async () => {
    const response = await axios.get(API_URL)

    return response.data;
}

const addDeck = async (deckData) => {
    const response = await axios.post(API_URL, deckData)

    return response.data
}

const decksService = {
    fetchDecks,
    addDeck
}

export default decksService
