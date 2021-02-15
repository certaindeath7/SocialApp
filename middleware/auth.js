const jwt = require('jsonwebtoken');
const config = require('config');

// this is middleware funciton
// parameter "next" is for callback function
// once this middleware finished running, another function starts
module.exports = function(req, res, next) {

    // Get token from header
    const token = req.header('x-auth-token');

    // Check if there's no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // verify token
    try {
        // get the decoded token
        const decoded = jwt.verify(token, config.get('jwtsecret'));

        req.user = decoded.user;
        next();
    }catch(err) {
        res.status(401).json({ msg: 'Token is not valid'});
    }
}
