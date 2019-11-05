const passport  = require('passport');

module.exports = (app) => {
    app.post('/auth/jwt', passport.authenticate('jwt', { session: false }),
        function(req, res) {
            res.send(req.user);
        }
    );

    
}
