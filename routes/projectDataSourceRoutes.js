const checkAuth = require('../middleware/checkAuth');
const ProjectDataSourcesController = require('../controllers/projectDataSources');

module.exports = (app) => {
  app.get('/api/projectDataSource', checkAuth, ProjectDataSourcesController.projectDataSourceInfo);
  app.get('/api/projectDataSources', checkAuth, ProjectDataSourcesController.projectDataSources);
  app.post('/api/createProjectDataSource', checkAuth, ProjectDataSourcesController.createProjectDataSource);
  app.patch('/api/updateProjectDataSource', checkAuth, ProjectDataSourcesController.updateProjectDataSource);
  app.delete('/api/deleteProjectDataSource', checkAuth, ProjectDataSourcesController.deleteProjectDataSource);
};
