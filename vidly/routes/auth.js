const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('Joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Does this user email exist
    let user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Invalid username or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password');      
    
    const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));

    res.send(token);
});

function validateLogin(login) {
    //Check if given User name meets criteria using Joi
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    const result = Joi.validate(login, schema);
    return result;
}

module.exports = router;