const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('../models/genre');

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 50
        },
        numberInStock: {
            type: Number,
            min: 0,
            max: 255,
            default: 0
        },
        dailyRentalRate: {
            type: Number,
            min: 0,
            max: 255,
            default: 0
        },
        genre: {
            type: genreSchema,
            required: true
        }
    }
);
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(Movie){
    //Check if given customer name meets criteria using Joi
    const schema = {
        title: Joi.string().min(5).max(50).required(),//Joi syntax for our name field
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0)
    }
    const result = Joi.validate(Movie, schema);
    return result;
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
