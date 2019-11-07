const checkAuth = require('../middleware/checkAuth');
const ProjectsController = require('../controllers/projects');

module.exports = (app) => {
  app.get('/api/projects', checkAuth, ProjectsController.projects);
  app.post('/api/create_project', checkAuth, ProjectsController.create_project);
  app.get('/api/projects/:project_id', checkAuth, ProjectsController.project_info);
  app.patch('/api/update_project/:project_id', checkAuth, ProjectsController.update_project);
  app.delete('/api/delete_project/:project_id', checkAuth, ProjectsController.delete_project);
};
