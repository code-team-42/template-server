require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const logger = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3001;
const db = require('./models');

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

db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, function() {
      console.log(`API Server now listening on PORT ${PORT}!`);
    });
  })
  .catch(err => console.log(err));
