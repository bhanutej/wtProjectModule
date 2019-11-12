const checkAuth = require('../middleware/checkAuth');
const ProjectVariablesController = require('../controllers/projectVariables');

module.exports = (app) => {
  /**
   * @swagger
   * /projectVariable:
   *  get:
   *    description: Get project variable information
   *    parameters:
   *      - name: projectVariableId
   *        in: body
   *        required: true
   */
  app.get('/api/projectVariable', checkAuth, ProjectVariablesController.projectVariableInfo);

  /**
   * @swagger
   * /projectVariables:
   *  get:
   *    description: Get project variables
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   */
  app.get('/api/projectVariables', checkAuth, ProjectVariablesController.projectVariables);

  /**
   * @swagger
   * /createProjectVariable:
   *  post:
   *    description: Create project variable
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: variableInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.post('/api/createProjectVariable', checkAuth, ProjectVariablesController.createProjectVariable);

  /**
   * @swagger
   * /updateProjectVariable:
   *  patch:
   *    description: Update project variable
   *    parameters:
   *      - name: projectVariableId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: variableInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.patch('/api/updateProjectVariable', checkAuth, ProjectVariablesController.updateProjectVariable);

  /**
   * @swagger
   * /deleteProjectVariable:
   *  delete:
   *    description: Delete project variable
   *    parameters:
   *      - name: projectVariableId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProjectVariable', checkAuth, ProjectVariablesController.deleteProjectVariable);
};
