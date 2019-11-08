const passport  = require('passport');

const UsersController = require('../controllers/users');

module.exports = (app) => {
    app.post('/auth/jwt', passport.authenticate('jwt', { session: false }),
        function(req, res) {
            res.send(req.user);
        }
    );

    app.post('/api/signup', UsersController.userJwtSignup);
    app.post('/api/signin', UsersController.userJwtSignin);
    app.get('/api/currentUser', (req, res) => {
        res.send(req.user);
    });
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
}
