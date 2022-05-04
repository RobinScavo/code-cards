const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

// All users
userRoutes.route("/users").get(function (req, res) {
    let db_connect = dbo.getDb("users");
    db_connect
        .collection('users')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// Specific user
userRoutes.route("/users/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection('users')
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// Create new user
userRoutes.route('/user/add').post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        password: req.body.password,
    };
    db_connect.collection('users').insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// Edit user
userRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
        $set: {
            name: req.body.name,
            password: req.body.password,
        },
    };
});

// Delete User
userRoutes.route('/:id').delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection('users').deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log('1 user deleted');
        response.json(obj);
    });
});

module.exports = userRoutes;
