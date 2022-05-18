const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const publicDecks = require('./routes/publicDecks');
const privateDecks = require('./routes/privateDecks');
// const cookieParser = require('cookie-parser');
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const dbURI= 'mongodb+srv://admin:b1agDX2mqb4M7TCz@code-cards.re9gn.mongodb.net/code-cards?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.use(authRoutes)
app.use(publicDecks)
app.use(privateDecks)
