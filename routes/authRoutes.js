const passport  = require('passport');

const UsersController = require('../controllers/users');

module.exports = (app) => {
    app.post('/auth/jwt', passport.authenticate('jwt', { session: false }),
        function(req, res) {
            res.send(req.user);
        }
    );
    
    /**
    * @swagger
    * /signup:
    *  post:
    *    description: User registration
    *    parameters:
    *      - name: firstName
    *        in: body
    *        required: true
    *        type: string
    *      - name: lastName
    *        in: body
    *        required: true
    *        type: string
    *      - name: email
    *        in: body
    *        required: true
    *        type: string
    *      - name: password
    *        in: body
    *        required: true
    *        type: string
    *      - name: phoneNumber
    *        in: body
    *        required: true
    *        type: string
    */
    app.post('/api/signup', UsersController.userJwtSignup);

    /**
    * @swagger
    * /signin:
    *  post:
    *    description: User signin
    *    parameters:
    *      - name: email
    *        in: body
    *        required: true
    *        type: string
    *      - name: password
    *        in: body
    *        required: true
    *        type: string
    */
    app.post('/api/signin', UsersController.userJwtSignin);
    app.get('/api/currentUser', (req, res) => {
        res.send(req.user);
    });
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
}
