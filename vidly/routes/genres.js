const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'action'},
    { id: 2, name: 'horror'},
    { id: 3, name: 'sci-fi'},
    { id: 3, name: 'comedy'}
];

//Get all the genres
router.get('/', (req, res) => {
    res.send(genres);
});

//Get a specified single genre
router.get('/:id', (req, res) => {
    const genre = genres.find( (c) => c.id === parseInt(req.params.id));
    if (!genre) { //404
        res.status(404).send('The genre was not found');
        return;
    }
    res.send(genre);
});

//Create a new genre
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

//Update a genre
router.put('/:id', (req,res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
    if (!genre) { //does a genre exist
        res.status(404).send('The genre was not found');
        return;
    }
    const { error } = validateGenre(req.body); // equiv to result.error
    if (error) { //does genre given match validation criteria
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }
    //Update genre.name in variable genre
    genre.name = req.body.name;
    res.send(genre);
});

//Delete a genre
router.delete('/:id', (req, res) => {
    const genre = genres.find( (c) => c.id === parseInt(req.params.id));
    if (!genre) { //404
        res.status(404).send('The genre was not found');
        return;
    }
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genre){
    //Check if given genre name meets criteria using Joi
    const schema = {
        name: Joi.string().min(3).required(),//Joi syntax for our name field
    }
    const result = Joi.validate(genre, schema);
    return result;
}

module.exports = router;