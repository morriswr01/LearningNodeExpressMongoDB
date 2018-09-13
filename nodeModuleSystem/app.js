//Wraps all code in this wrapper 
// function (exports, require, module, __filename, __dirname){some code})

console.log(__filename);
console.log(__dirname);
//LOADING A MODULE
const logger = require('./logger');

logger('message');