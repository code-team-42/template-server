require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport');
const logger = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3000;

/*
 * Connect to the Mongo DB.
 * Replace 'DBName' with name of actual database.
 *
 */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/DBName', {
    useNewUrlParser: true
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Passport
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Logging
app.use(logger('dev'));

//Routes
app.use(routes);

//Error handler
app.use(errorHandler);

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
