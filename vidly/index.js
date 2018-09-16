const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());



const genres = [
    { id: 1, name: 'action'},
    { id: 2, name: 'horror'},
    { id: 3, name: 'sci-fi'},
    { id: 3, name: 'comedy'}
]

//Get all the genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//Get a specified single genre
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find( (c) => c.id === parseInt(req.params.id));
    if (!genre) { //404
        res.status(404).send('The genre was not found');
        return;
    }
    res.send(genre);
});

//Create a new genre
app.post('/api/genres', (req, res) => {
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
app.put('/api/genres/:id', (req,res) => {
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
app.delete('/api/genres/:id', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});