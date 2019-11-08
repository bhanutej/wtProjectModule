const checkAuth = require('../middleware/checkAuth');
const ProjectsController = require('../controllers/projects');

module.exports = (app) => {
  app.get('/api/projects', checkAuth, ProjectsController.projects);
  app.post('/api/createProject', checkAuth, ProjectsController.createProject);
  app.get('/api/projects', checkAuth, ProjectsController.projectInfo);
  app.patch('/api/updateProject', checkAuth, ProjectsController.updateProject);
  app.delete('/api/deleteProject', checkAuth, ProjectsController.deleteProject);
};
