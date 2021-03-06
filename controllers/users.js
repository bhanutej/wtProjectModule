const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('users');
const keys = require('../config/keys');
const { handleErrors } = require('../utilities/handlePromise');

module.exports = {
    userJwtSignup: async (req, res, next) => {
        try {
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const userObj = new User(_getJwtUserObj(req.body, passwordHash));
            const user = await userObj.save();
            res.status(201).send({ message: 'User create', user });
        } catch (errors) {
            if (errors.code === 11000 && errors.name === 'MongoError'){
                res.status(422).send({ error: "Email already existed" });
            }
            const [handledErrors, statusCode] = handleErrors(errors);
            res.status(statusCode).send(handledErrors);
        }
    },

    userJwtSignin: async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if(user) {
                const checkPassword = await bcrypt.compare(req.body.password, user.password);
                if(checkPassword) {
                    const token = _getSignInJwtToken(user);
                    return res.status(200).json({ message: 'Auth Successfull', token });
                }
            }
            res.status(401).json({ error: 'Auth failed' });
        } catch (errors) {
            const [handledErrors, statusCode] = handleErrors(errors);
            res.status(statusCode).send(handledErrors);
        }
    }
};

_getJwtUserObj = (user, hash) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hash,
        phoneNumber: user.phoneNumber
    };
};

_getSignInJwtToken = (user) => {
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
