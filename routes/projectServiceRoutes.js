const checkAuth = require('../middleware/checkAuth');
const ProjectServicesController = require('../controllers/projectServices');

module.exports = (app) => {
  app.get('/api/projectService', checkAuth, ProjectServicesController.projectServiceInfo);
  app.get('/api/projectServices', checkAuth, ProjectServicesController.projectServices);
  app.post('/api/createProjectService', checkAuth, ProjectServicesController.createProjectService);
  app.patch('/api/updateProjectService', checkAuth, ProjectServicesController.updateProjectService);
  app.delete('/api/deleteProjectService', checkAuth, ProjectServicesController.deleteProjectService);
};
