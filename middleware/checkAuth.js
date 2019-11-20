const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const keys = require('../config/keys');
const User = mongoose.model("users");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, keys.jwtClientSecret);
        req.userData = decoded;
        const user = await User.findById({ _id: req.userData.userId });
        if (!user) {
            return res.status(401).json({ error: 'Auth Failed' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Auth Failed' });
    }
};
