const checkAuth = require('../middleware/checkAuth');
const ProjectServicesController = require('../controllers/projectServices');

module.exports = (app) => {
  /**
   * @swagger
   * /projectService:
   *  get:
   *    description: Get project service information
   *    parameters:
   *      - name: projectServiceId
   *        in: body
   *        required: true
   */
  app.get('/api/projectService', checkAuth, ProjectServicesController.projectServiceInfo);

  /**
   * @swagger
   * /projectServices:
   *  get:
   *    description: Get project services
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   */
  app.get('/api/projectServices', checkAuth, ProjectServicesController.projectServices);

  /**
   * @swagger
   * /createProjectService:
   *  post:
   *    description: Create project service
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: serviceInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.post('/api/createProjectService', checkAuth, ProjectServicesController.createProjectService);

  /**
   * @swagger
   * /updateProjectService:
   *  patch:
   *    description: Update project service
   *    parameters:
   *      - name: projectServiceId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: serviceInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.patch('/api/updateProjectService', checkAuth, ProjectServicesController.updateProjectService);

  /**
   * @swagger
   * /deleteProjectService:
   *  delete:
   *    description: Delete project service
   *    parameters:
   *      - name: projectServiceId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProjectService', checkAuth, ProjectServicesController.deleteProjectService);
};
