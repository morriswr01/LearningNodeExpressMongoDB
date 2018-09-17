const debug = require('debug')('app:startup');//Show log messages for startup
const config = require('config')//Set env
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
//routers
const courses = require('./routes/courses');
const home = require('./routes/home');

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
 
app.use(express.json()); //changes req.body to json
app.use(express.urlencoded({ extended: true }));//form data to json
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Configuation 
// console.log('Applicaton Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

// PORTs are dynamically assigned on a deployment server(production) so will not always be 3000. PORT env variable must be used by application.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});