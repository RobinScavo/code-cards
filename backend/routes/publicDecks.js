const express = require('express');
const router = express.Router()
const { getPublicDecks, setPublicDeck, updatePublicDeck, deletePublicDeck } = require('../controllers/publicDecks');

router.route('/').get(getPublicDecks).post(setPublicDeck)

router.route('/:id').put(updatePublicDeck).delete(deletePublicDeck)

module.exports = router;
