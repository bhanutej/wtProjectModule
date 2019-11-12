const checkAuth = require('../middleware/checkAuth');
const ProjectAlertsController = require('../controllers/projectAlerts');

module.exports = (app) => {
  /**
   * @swagger
   * /projectAlert:
   *  get:
   *    description: Get project alert information
   *    parameters:
   *      - name: projectAlertId
   *        in: body
   *        required: true
   */
  app.get('/api/projectAlert', checkAuth, ProjectAlertsController.projectAlertInfo);

  /**
   * @swagger
   * /projectAlerts:
   *  get:
   *    description: Get project alerts
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   */
  app.get('/api/projectAlerts', checkAuth, ProjectAlertsController.projectAlerts);

  /**
   * @swagger
   * /createProjectAlert:
   *  post:
   *    description: Create project alert
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: alertInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.post('/api/createProjectAlert', checkAuth, ProjectAlertsController.createProjectAlert);

  /**
   * @swagger
   * /updateProjectAlert:
   *  patch:
   *    description: Update project alert
   *    parameters:
   *      - name: projectAlertId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: alertInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.patch('/api/updateProjectAlert', checkAuth, ProjectAlertsController.updateProjectAlert);

  /**
   * @swagger
   * /deleteProjectAlert:
   *  delete:
   *    description: Delete project alert
   *    parameters:
   *      - name: projectAlertId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProjectAlert', checkAuth, ProjectAlertsController.deleteProjectAlert);
};
