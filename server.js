require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

// Serve static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

//Passport
app.use(passport.initialize());

//Logging
app.use(logger('dev'));

//Routes
app.use(routes);

//Error handler
app.use(errorHandler);

app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});
