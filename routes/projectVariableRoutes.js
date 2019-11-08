const checkAuth = require('../middleware/checkAuth');
const ProjectVariablesController = require('../controllers/projectVariables');

module.exports = (app) => {
  app.post('/api/createProjectVariable', checkAuth, ProjectVariablesController.createProjectVariable);
};
