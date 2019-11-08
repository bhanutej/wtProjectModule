const checkAuth = require('../middleware/checkAuth');
const projectProfilePagesController = require('../controllers/projectProfilePages');

module.exports = (app) => {
  app.get('/api/projectProfilePage', checkAuth, projectProfilePagesController.projectProfilePageInfo);
  app.get('/api/projectProfilePages', checkAuth, projectProfilePagesController.projectProfilePages);
  app.post('/api/createProjectProfilePage', checkAuth, projectProfilePagesController.createProjectProfilePage);
  app.patch('/api/updateProjectProfilePage', checkAuth, projectProfilePagesController.updateProjectProfilePage);
  app.delete('/api/deleteProjectProfilePage', checkAuth, projectProfilePagesController.deleteProjectProfilePage);
};
