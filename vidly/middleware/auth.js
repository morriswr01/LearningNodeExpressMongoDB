const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Does an auth token exist at all
    if (!token) return res.status(401).send('Access denied. No token provided.');

    //Is the token recieved valid
    try {
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

exports.auth = auth;