const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error');
const connectDB = require('./config/db')
const port = process.env.PORT || 8080;
const publicDecks = require('./routes/publicDecks');

connectDB();

const app = express();

app.use(express.urlencoded({extended: false}));

app.use('/publicDecks', publicDecks);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
