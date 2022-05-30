const express = require('express');
const router = express.Router()
const { getDecks, getDeck, setDeck, updateDeck, deleteDeck } = require('../controllers/deckController');

router.route('/').get(getDecks).post(setDeck)

router.route('/:id').get(getDeck).put(updateDeck).delete(deleteDeck)

module.exports = router;
