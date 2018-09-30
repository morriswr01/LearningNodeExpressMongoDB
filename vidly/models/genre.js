const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255
        }
    }
);
const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genreName){
    //Check if given genre name meets criteria using Joi
    const schema = {
        name: Joi.string().min(3).required(),//Joi syntax for our name field
    }
    const result = Joi.validate(genreName, schema);
    return result;
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;