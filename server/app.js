const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');
const cors = require("cors");
// const { mongoose } = require('mongoose');
// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
const User = require('./models/User');
// init app and middleware
const app = express()
app.use(cors())
app.use(express.json())

// db connection
let db;


connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

// const dbo = require("./db")

// const dbURI= 'mongodb+srv://admin:b1agDX2mqb4M7TCz@code-cards.re9gn.mongodb.net/code-cards?retryWrites=true&w=majority';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err));



// routes
app.get('/publicDecks', (req, res) => {
    const page = req.query.p || 0
    const decksPerPage = 20

    let decks = []

    db.collection('publicDecks')
        .find() // cursor toArray forEach
        .sort({ likes: 1 })
        .skip(page * decksPerPage)
        .limit(decksPerPage)
        .forEach(deck => decks.push(deck))
        .then(() => {
            res.status(200).json(decks);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch decks.' });
        })
})

app.get('/privateDecks', (req, res) => {
    const page = req.query.p || 0
    const decksPerPage = 20

    let decks = []

    db.collection('privateDecks')
        .find() // cursor toArray forEach
        // sort by timestamp
        .skip(page * decksPerPage)
        .limit(decksPerPage)
        .forEach(deck => decks.push(deck))
        .then(() => {
            res.status(200).json(decks);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch decks.' });
        })
})

app.get('/privateDecks/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('privateDecks')
            .findOne({ _id: ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch deck.'})
            })
    } else {
        res.status(500).json({error: 'Not a valid deck ID.'})
    }
})

app.get('/publicDecks/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('publicDecks')
            .findOne({ _id: ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch deck.'})
            })
    } else {
        res.status(500).json({error: 'Not a valid deck ID.'})
    }
})

app.post('/privateDecks', (req, res) => {
    const deck = req.body

    db.collection('privateDecks')
    .insertOne(deck)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new deck'})
    })
})

app.post('/publicDecks', (req, res) => {
    const deck = req.body

    db.collection('publicDecks')
    .insertOne(deck)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new deck'})
    })
})

app.delete('/privateDecks/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('privateDecks')
            .deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete deck.'})
            })
    } else {
        res.status(500).json({error: 'Not a valid deck ID.'})
    }
})

app.delete('/publicDecks/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('publicDecks')
            .deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete deck.'})
            })
    } else {
        res.status(500).json({error: 'Not a valid deck ID.'})
    }
})

app.patch('/privateDecks/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('privateDecks')
            .updateOne({ _id: ObjectId(req.params.id)}, {$set: updates} )
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update deck.'})
            })
    } else {
        res.status(500).json({error: 'Not a valid deck ID.'})
    }
})

app.post('/signup', async (req, res) => {
    const { userName, password } = req.body;

    // console.log('22222', userName, password)

    // try {
    //     const user = await User.create({ userName, password });
    //     res.status(201).json(user)
    // }
    // catch (err) {
    //     console.log(err);
    //     res.status(400).send('error, user not created')
    // }

    db.collection('users')
    .insertOne({ userName, password })
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create user'})
    })
});

app.get('/login', () => {});
app.post('/login', () => {});
