const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
    console.log("!!!!!!!", req.headers.authorization);
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(">>>>>>>>>>>>>>>>>>", token);
        const decoded = jwt.verify(token, keys.jwtClientSecret);
        console.log("<<<<<<<<<<<<<<<<<<<<<", decoded);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Auth Failed' });
    }
};
