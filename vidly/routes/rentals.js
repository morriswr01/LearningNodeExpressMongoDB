const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const Fawn = require('fawn');
const router = express.Router();
const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { auth } = require('../middleware/auth');

Fawn.init(mongoose);

//Get all the rental
router.get('/', async (req, res) => {
    const rental = await Rental.find();
    res.send(rental);
});

//Get a specified single rental
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) { //404
        res.status(404).send('The rental was not found');
        return;
    }
    res.send(rental);
});

//Create a new rental
router.post('/', auth, async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send("Customer does not exist");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send("Movie does not exist");
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');
 
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc: { numberInStock: -1}
            })
            .run();
    } catch (error) {
        res.status(500).send('Something went wrong');
    }


    // rental = await rental.save();

    // movie.numberInStock--;
    // movie.save();

    res.send(rental);
}); 

module.exports = router;