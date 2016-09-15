
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var students = require('./routes/students.js');
var courses = require('./routes/courses.js');
var records = require('./routes/records.js');
var models = require("./models");
var app = express();

// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 80));

// bodyParser needs to be configured for parsing JSON from HTTP body
app.use(bodyParser.json());

// Mount our routes behind /api/ prefix
app.use('/api', students);
app.use('/api', courses);
app.use('/api', records);


// start listening for incoming HTTP connections
models.sequelize.sync().then(function() {
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
});

