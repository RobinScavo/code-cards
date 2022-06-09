const asyncHandler = require('express-async-handler')

const Deck = require('../models/privateDeckModel');
const User = require('../models/userModel')

// @desc Get private Decks
// @route GET /privateDecks
// @access private
const getPrivateDecks = asyncHandler(async (req, res) => {
    console.log('!!!!!!', req.user.id)
    const decks = await Deck.find({ user: req.user.id });

    res.status(200).json(decks)
})

// @desc Set private deck
// @route POST /privateDecks
// @access private
const setPrivateDeck = asyncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const deck = await Deck.create(req.body)

    res.status(200).json(deck)
})

// @desc Update deck
// @route PUT /privateDecks/:id
// @access private

const updatePrivateDeck = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user.id);
    const deck = await Deck.findById(req.params.id);

// Check for user
if (!req.user) {
    res.status(401)
    throw new Error('User not found.')
}

// Make sure logged in user matches the deck user
if (deck.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized.')
}

    if(!deck) {
        res.status(400)
        throw new Error('Deck not found')
    }

    const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedDeck)
})

// @desc Get goals
// @route DELETE /privateDecks/:id
// @access private
const deletePrivateDeck = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user.id);
    const deck = await Deck.findById(req.params.id);

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found.')
    }

    // Make sure logged in user matches the deck user
    if (deck.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }

    if(!deck) {
        res.status(400)
        throw new Error('Deck not found')
    }

    await deck.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPrivateDecks,
    setPrivateDeck,
    updatePrivateDeck,
    deletePrivateDeck
}
