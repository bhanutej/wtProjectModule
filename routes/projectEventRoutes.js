const checkAuth = require('../middleware/checkAuth');
const ProjectEventsController = require('../controllers/projectEvents');

module.exports = (app) => {
  /**
   * @swagger
   * /projectEvent:
   *  get:
   *    description: Get project event information
   *    parameters:
   *      - name: projectEventId
   *        in: body
   *        required: true
   */
  app.get('/api/projectEvent', checkAuth, ProjectEventsController.projectEventInfo);

  /**
   * @swagger
   * /projectEvents:
   *  get:
   *    description: Get project events
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   */
  app.get('/api/projectEvents', checkAuth, ProjectEventsController.projectEvents);

  /**
   * @swagger
   * /createProjectEvent:
   *  post:
   *    description: Create project event
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: eventInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.post('/api/createProjectEvent', checkAuth, ProjectEventsController.createProjectEvent);

  /**
   * @swagger
   * /updateProjectEvent:
   *  patch:
   *    description: Update project event
   *    parameters:
   *      - name: projectEventId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: eventInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.patch('/api/updateProjectEvent', checkAuth, ProjectEventsController.updateProjectEvent);

  /**
   * @swagger
   * /deleteProjectEvent:
   *  delete:
   *    description: Delete project event
   *    parameters:
   *      - name: projectEventId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProjectEvent', checkAuth, ProjectEventsController.deleteProjectEvent);
};
