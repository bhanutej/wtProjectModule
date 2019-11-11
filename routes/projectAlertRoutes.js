const checkAuth = require('../middleware/checkAuth');
const ProjectAlertsController = require('../controllers/projectAlerts');

module.exports = (app) => {
  app.get('/api/projectAlert', checkAuth, ProjectAlertsController.projectAlertInfo);
  app.get('/api/projectAlerts', checkAuth, ProjectAlertsController.projectAlerts);
  app.post('/api/createProjectAlert', checkAuth, ProjectAlertsController.createProjectAlert);
  app.patch('/api/updateProjectAlert', checkAuth, ProjectAlertsController.updateProjectAlert);
  app.delete('/api/deleteProjectAlert', checkAuth, ProjectAlertsController.deleteProjectAlert);
};
