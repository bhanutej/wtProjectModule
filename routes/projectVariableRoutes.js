const checkAuth = require('../middleware/checkAuth');
const ProjectVariablesController = require('../controllers/projectVariables');

module.exports = (app) => {
  app.get('/api/projectVariable', checkAuth, ProjectVariablesController.projectVariableInfo);
  app.get('/api/projectVariables', checkAuth, ProjectVariablesController.projectVariables);
  app.post('/api/createProjectVariable', checkAuth, ProjectVariablesController.createProjectVariable);
  app.patch('/api/updateProjectVariable', checkAuth, ProjectVariablesController.updateProjectVariable);
};
