const checkAuth = require('../middleware/checkAuth');
const ProjectsController = require('../controllers/projects');

module.exports = (app) => {
  app.post('/api/create_project', checkAuth, ProjectsController.create_project);
  app.patch('/api/update_project/:project_id', checkAuth, ProjectsController.update_project);
};
