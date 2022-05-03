const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));

//get driver connection
const dbo = require('./db/conn');

app.listen(port, () => {
    dbo.connectToServer(function(err) {
        if(err) console.log(err);

    });
    console.log(`Serveris running on port: ${port}`);
});
