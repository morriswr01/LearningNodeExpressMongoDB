const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

//Get all the customer
router.get('/', async (req, res) => {
    const customer = await Customer
        .find()
        .select({name: 1, _id: 1});
    res.send(customer);
});

//Get a specified single customer
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) { //404
        res.status(404).send('The customer was not found');
        return;
    }
    res.send(customer);
});

//Create a new customer
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
}); 

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body); // equiv to result.error
    if (error) { //does customer given match validation criteria
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }
    //Update customer.name in variable customer
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    }, {new: true});

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

//Delete a customer
router.delete('/:id', async (req, res) => {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(deletedCustomer);
});

module.exports = router;