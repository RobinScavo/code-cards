const express = require('express');
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const {
    getPublicDecks,
    getPublicDeck,
    getPrivateDecks,
    getPrivateDeck,
    addDeck,
    updateDeck,
    deleteDeck,
    // incrementUpload
} = require('../controllers/deckControllers');

// Protected
router.route('/privateDecks').get(protect, getPrivateDecks).post(protect, addDeck)
router.route('/privateDecks/:id').get(protect, getPrivateDeck).put(protect, updateDeck).delete(protect, deleteDeck)

// Unprotected
router.route('/').get(getPublicDecks)
router.route('/:id').get(getPublicDeck)
// router.route('/privateDecks/increment/:id').put(incrementUpload)

module.exports = router;
