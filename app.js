//Packages
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//env 
require('dotenv').config();

//routes

//DB
const db = process.env.MONGODB_URI ;

// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}) 
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Production Requirements
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;