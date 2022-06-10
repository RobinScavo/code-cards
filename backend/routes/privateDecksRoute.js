const express = require('express');
const router = express.Router()
const { getPrivateDecks, getPrivateDeck, setPrivateDeck, updatePrivateDeck, deletePrivateDeck } = require('../controllers/privateDeckController');
const { protect } = require('../middleware/authMiddleware')

// router.route('/').get(getPrivateDecks).post(setPrivateDeck)
router.route('/').get(protect, getPrivateDecks).post(protect, setPrivateDeck)

router.route('/:id').get(getPrivateDeck).put(protect, updatePrivateDeck).delete(protect, deletePrivateDeck)

module.exports = router;
