const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require("cors");
const { errorHandler } = require('./middleware/error');
const connectDB = require('./config/db')
const port = process.env.PORT || 8080;
const publicDecks = require('./routes/publicDecksRoute');
const privateDecks = require('./routes/privateDecksRoute');
const users = require('./routes/usersRoute');

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use('/publicDecks', publicDecks);
app.use('/privateDecks', privateDecks);
app.use('/users', users);

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
