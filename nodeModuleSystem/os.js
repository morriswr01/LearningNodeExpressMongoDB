const os = require('os');

var totalMem = os.totalmem();
var freeMem = os.freemem();

console.log(totalMem);
console.log(freeMem);