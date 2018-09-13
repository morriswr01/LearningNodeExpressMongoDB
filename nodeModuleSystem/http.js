//HTTP Module is an event emitter
const http = require('http');

const server = http.createServer( (req, res) => {
    //These are routes, and in regular node are handled in a linear way which can be a problem for a large number of pages. Express.js is the solution.
    if(req.url === '/'){
        res.write('Hello world');
        res.end();
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.on('connection', (socket) => {
    console.log('new connection...')
})

server.listen(3000);

console.log('Listening on port 3000...');