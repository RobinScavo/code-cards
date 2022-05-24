const asyncHandler = require('express-async-handler')
// @desc Get public Decks
// @route GET /publicDecks
// @access Public
const getPublicDecks = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get decks'})
})
// @desc Set public deck
// @route POST /publicDecks
// @access Public
const setPublicDeck = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please!')
    }
    res.status(200).json({message: 'create deck'})
})

// @desc Update deck
// @route PUT /publicDecks/:id
// @access Public
const updatePublicDeck = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update deck ${req.params.id}`})
})

// @desc Get goals
// @route DELETE /publicDecks/:id
// @access Public
const deletePublicDeck = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete deck ${req.params.id}`})
})

module.exports = {
    getPublicDecks,
    setPublicDeck,
    updatePublicDeck,
    deletePublicDeck
}
