const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                min: 0,
                max: 255,
                default: 0
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(Rental){
    //Check if given Rental name meets criteria using Joi
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    };
    const result = Joi.validate(Rental, schema);
    return result;
}

exports.Rental = Rental;
exports.validateRental = validateRental;