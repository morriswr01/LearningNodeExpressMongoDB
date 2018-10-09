const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');
const {auth} = require('../middleware/auth');

//Get all the genres
router.get('/', async (req, res) => {
    const genres = await Genre
        .find()
        .select({name: 1, _id: 1});
    res.send(genres);
});

//Get a specified single genre
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) { //404
        res.status(404).send('The genre was not found');
        return;
    }
    res.send(genre);
});

//Create a new genre
router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }
    let genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save();
    res.send(genre);
}); 

//Update a genre
router.put('/:id', async (req,res) => {
    const { error } = validateGenre(req.body); // equiv to result.error
    if (error) { //does genre given match validation criteria
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }
    //Update genre.name in variable genre
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }
    }, {new: true});

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

//Delete a genre
router.delete('/:id', async (req, res) => {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(deletedGenre);
}); 

module.exports = router;