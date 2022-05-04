require("dotenv").config({ path: "./config.env" });
const { MongoClient } = require('mongodb');
const Db = process.env.ATLAS_URI;


let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(Db)
            .then(client => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}
