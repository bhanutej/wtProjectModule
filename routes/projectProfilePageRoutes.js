const checkAuth = require('../middleware/checkAuth');
const projectProfilePagesController = require('../controllers/projectProfilePages');

module.exports = (app) => {
  app.post('/api/createProjectProfilePage', checkAuth, projectProfilePagesController.createProjectProfilePage);
};
