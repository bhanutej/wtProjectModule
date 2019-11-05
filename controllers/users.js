const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('users');
const keys = require('../config/keys');
const { handleErrors, handleUnauthorizedExecption } = require('../utilities/handlePromise');

module.exports = {
    user_jwt_signup: async (req, res, next) => {
        try {
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const userObj = new User(getJwtUserObj(req.body, passwordHash));
            const user = await userObj.save();
            res.status(201).send({ message: 'User create', user });
        } catch (error) {
            if (error.code === 11000 && error.name === 'MongoError'){
                res.status(422).send({ error: "Email already existed" });
            }
            res.send(500).send({ error });
        }
    },

    user_jwt_signin: async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if(user) {
                const checkPassword = await bcrypt.compare(req.body.password, user.password);
                if(checkPassword) {
                    const token = getSignInJwtToken(user);
                    return res.status(200).json({ message: 'Auth Successfull', token });
                }
            }
            res.status(401).json({ error: 'Auth failed' });
        } catch (error) {
            res.status(500).send({ error });
        }
    }
};

getJwtUserObj = (user, hash) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hash
    };
};

getSignInJwtToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            userId: user._id
        },
        keys.jwtClientSecret,
        {
            expiresIn: '24h'
        }
    );
}
