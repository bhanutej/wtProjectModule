const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1];
        const decoded = jwt.verify(token, keys.jwtClientSecret);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Auth Failed' });
    }
};
