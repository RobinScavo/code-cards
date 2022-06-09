const asyncHandler = require('express-async-handler')

const Deck = require('../models/deckModel');

// @desc Get public Decks
// @route GET /publicDecks
// @access Public
const getDecks = asyncHandler(async (req, res) => {
    const decks = await Deck.find();

    res.status(200).json(decks)
})

// @desc Get public Deck
// @route GET /publicDecks/:id
// @access Public
const getDeck = asyncHandler(async (req, res) => {
    const deck = await Deck.findById(req.params.id);

    res.status(200).json(deck)
})

// @desc Set public deck
// @route POST /publicDecks
// @access Public
const setDeck = asyncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const deck = await Deck.create(req.body)

    res.status(200).json(deck)
})

// @desc Update deck
// @route PUT /publicDecks/:id
// @access Public
const updateDeck = asyncHandler(async (req, res) => {
    // const deck = await Deck.findById(req.params.id);

    if(!req.deck) {
        res.status(400)
        throw new Error('Deck not found')
    }

    const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedDeck)
})

// @desc Get goals
// @route DELETE /publicDecks/:id
// @access Public
const deleteDeck = asyncHandler(async (req, res) => {
    const deck = await Deck.findById(req.params.id);

    if(!deck) {
        res.status(400)
        throw new Error('Deck not found')
    }

    await deck.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getDecks,
    getDeck,
    setDeck,
    updateDeck,
    deleteDeck
}
