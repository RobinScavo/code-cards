const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
    author: {
        type: String,
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject']
    },
    title: {
        type: String,
        require: [true, 'Please add a title']
    },
    likes: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    cards: {
        type: Array
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Deck', deckSchema)
