const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
]
//Routes with http get requsts
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( (c) => c.id === parseInt(req.params.id));
    if (!course) { //404
        res.status(404).send('The course was not found');
        return;
    }
    res.send(course);
});
//Routes with http post request with data validation which we are going to use Joi for
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // equiv to result.error
    if (error) { //does course given match validation criteria
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});
//Routes with http put to update a course
app.put('/api/courses/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if (!course) { //does a course exist
        res.status(404).send('The course was not found');
        return;
    }
    const { error } = validateCourse(req.body); // equiv to result.error
    if (error) { //does course given match validation criteria
        res.status(400).send(error.details[0].message); // 400 = bad request
        return;
    }
    //Update course.name in variable course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find( (c) => c.id === parseInt(req.params.id));
    if (!course) { //404
        res.status(404).send('The course was not found');
        return;
    }

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);   
});

function validateCourse(course){
    //Check if given course name meets criteria using Joi
    const schema = {
        name: Joi.string().min(3).required(),//Joi syntax for our name field
    }
    const result = Joi.validate(course, schema);
    return result;
}

app.put

// PORTs are dynamically assigned on a deployment server(production) so will not always be 3000. PORT env variable must be used by application.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});