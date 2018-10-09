const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const {auth} = require('../middleware/auth');
const {admin} = require('../middleware/admin');

//Get all the movies
router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

//Get a specified single movie
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) { //404
        res.status(404).send('The movie was not found');
        return;
    }
    res.send(movie);
});

//Create a new movie
router.post('/', auth, async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error)  return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
        return res.status(404).send("Genre does not exist")        
    }

    const movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyrentalRate: req.body.dailyrentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    await movie.save();

    res.send(movie);
}); 

//Update a movie
router.put('/:id', auth, async (req,res) => {
    const { error } = validateMovie(req.body); // equiv to result.error
    if (error) { //does genre given match validation criteria
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
        return res.status(404).send("Genre does not exist")        
    }
    //Update genre.name in variable genre
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: {
                _id: genre._id,
                name: genre.name
            }
        }
    }, {new: true});

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

//Delete a movie
router.delete('/:id', [auth, admin], async (req, res) => {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(deletedMovie);
});

module.exports = router;