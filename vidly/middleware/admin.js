
function admin(req, res, next) {
    if (req.body.isAdmin == false) return res.status(403).send('Access denied.');
    next();
}

exports.admin = admin;