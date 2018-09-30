const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema(
    {
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
    }
));

function validateCustomer(Customer){
    //Check if given customer name meets criteria using Joi
    const schema = {
        name: Joi.string().min(5).max(50).required(),//Joi syntax for our name field
        phone: Joi.string().min(5).max(50).required(),//Joi syntax for our name field
        isGold: Joi.boolean()
    }
    const result = Joi.validate(Customer, schema);
    return result;
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
