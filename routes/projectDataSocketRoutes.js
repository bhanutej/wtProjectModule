const checkAuth = require('../middleware/checkAuth');
const ProjectDataSocketsController = require('../controllers/projectDataSockets');

module.exports = (app) => {
  /**
   * @swagger
   * /projectDataSocket:
   *  get:
   *    description: Get project data socket information
   *    parameters:
   *      - name: projectDataSocketId
   *        in: body
   *        required: true
   */
  app.get('/api/projectDataSocket', checkAuth, ProjectDataSocketsController.projectDataSocketInfo);

  /**
   * @swagger
   * /projectDataSockets:
   *  get:
   *    description: Get project data sockets
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   */
  app.get('/api/projectDataSockets', checkAuth, ProjectDataSocketsController.projectDataSockets);

  /**
   * @swagger
   * /createProjectDataSocket:
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
   *      - name: socketInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.post('/api/createProjectDataSocket', checkAuth, ProjectDataSocketsController.createProjectDataSocket);

  /**
   * @swagger
   * /updateProjectDataSocket:
   *  patch:
   *    description: Update project alert
   *    parameters:
   *      - name: projectDataSocketId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: socketInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.patch('/api/updateProjectDataSocket', checkAuth, ProjectDataSocketsController.updateProjectDataSocket);

  /**
   * @swagger
   * /deleteProjectDataSocket:
   *  delete:
   *    description: Delete project alert
   *    parameters:
   *      - name: projectDataSocketId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProjectDataSocket', checkAuth, ProjectDataSocketsController.deleteProjectDataSocket);
};
