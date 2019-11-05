const passport = require('passport');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../config/keys');
const User = mongoose.model('users');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtClientSecret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done){
    User.findOne({id: jwt_payload.sub}, function(err, user){
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            console.log(">>>>>>new user", user);
            return done(null, false);
        }
    });
}));
