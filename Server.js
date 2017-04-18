'use strict'

const express = require("express");
const multer = require('multer');
const app = express();
const mongo = require('mongodb');
const assert = require('assert');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const schema = require('./model');
const fs = require('fs');


const storage = multer.diskStorage({
    //ES6 object
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({
    storage: storage
}).single('userPhoto');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/upload.html");
});

app.post('/api/photo', function(req, res) {
    const item = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description, //avoid last parenthesis

    };

    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
        console.log(req.body);
    });
});


mongoose.connect('mongodb://localhost:27017/test').then(() => {
  console.log('Connected successfully.');
}, err => {
  console.log('Cnnection to db failed: ' + err);
});

app.listen(3000, function() {
    console.log("Working on port 3000");
});
