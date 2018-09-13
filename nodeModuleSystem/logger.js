//File to be used in multiple parts of the appliaction but is private to start with
const EventEmitter = require('events');

var url = 'http://my logger.io/log';

class Logger extends EventEmitter {
    log(message) {
        // Send http request
        console.log(message);
        this.emit('messageLogged', {id: 1, url: 'http://'});
    }
}

module.exports = Logger;
