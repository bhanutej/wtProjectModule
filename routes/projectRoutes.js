const checkAuth = require('../middleware/checkAuth');
const ProjectsController = require('../controllers/projects');

module.exports = (app) => {
  app.post('/api/create_project', checkAuth, ProjectsController.create_project);
};
