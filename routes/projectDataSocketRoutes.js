const checkAuth = require('../middleware/checkAuth');
const ProjectDataSocketsController = require('../controllers/projectDataSockets');

module.exports = (app) => {
  app.get('/api/projectDataSocket', checkAuth, ProjectDataSocketsController.projectDataSocketInfo);
  app.get('/api/projectDataSockets', checkAuth, ProjectDataSocketsController.projectDataSockets);
  app.post('/api/createProjectDataSocket', checkAuth, ProjectDataSocketsController.createProjectDataSocket);
  app.patch('/api/updateProjectDataSocket', checkAuth, ProjectDataSocketsController.updateProjectDataSocket);
  app.delete('/api/deleteProjectDataSocket', checkAuth, ProjectDataSocketsController.deleteProjectDataSocket);
};
