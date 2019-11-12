const checkAuth = require('../middleware/checkAuth');
const ProjectAlertsController = require('../controllers/projectAlerts');

module.exports = (app) => {
  /**
   * @swagger
   * /projectAlert:
   *  get:
   *    description: Get project alert information
   *    requestBody:
   *      required: true
   *      projectAlertId: qqqqqqqqq
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.get('/api/projectAlert', checkAuth, ProjectAlertsController.projectAlertInfo);
  app.get('/api/projectAlerts', checkAuth, ProjectAlertsController.projectAlerts);
  app.post('/api/createProjectAlert', checkAuth, ProjectAlertsController.createProjectAlert);
  app.patch('/api/updateProjectAlert', checkAuth, ProjectAlertsController.updateProjectAlert);
  app.delete('/api/deleteProjectAlert', checkAuth, ProjectAlertsController.deleteProjectAlert);
};
