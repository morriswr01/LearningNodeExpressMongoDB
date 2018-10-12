//Essential shizz
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config');
const error = require('./middleware/error');
require('express-async-errors');

//Validation
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//Routes
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')){
    console.log('Fatal error: jwtPrivateKey is not set');
    process.exit(1);
}
//Global connection to the database
mongoose.connect('mongodb://localhost:27017/vidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...)', err));

//Applys middleware
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

//Start local webserver and listen for api requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});