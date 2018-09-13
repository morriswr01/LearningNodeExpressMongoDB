const Logger = require('./logger');
const logger = new Logger();

//Register a listener
logger.on('messageLogged', (arg) => {// e, eventarg
    console.log('listener Called', arg);
});

logger.log('message');

// Raise: logging (data: message)
// emitter.on('logging', (arg) => {
//     console.log(arg.data);
// })
// emitter.emit('logging', {data: 'message'});
