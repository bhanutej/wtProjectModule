const checkAuth = require('../middleware/checkAuth');
const ProjectDataSourcesController = require('../controllers/projectDataSources');

module.exports = (app) => {
  /**
   * @swagger
   * /projectDataSource:
   *  get:
   *    description: Get project data source information
   *    parameters:
   *      - name: projectDataSourceId
   *        in: body
   *        required: true
   */
  app.get('/api/projectDataSource', checkAuth, ProjectDataSourcesController.projectDataSourceInfo);

  /**
   * @swagger
   * /projectDataSources:
   *  get:
   *    description: Get project data sources
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   */
  app.get('/api/projectDataSources', checkAuth, ProjectDataSourcesController.projectDataSources);

  /**
   * @swagger
   * /createProjectDataSource:
   *  post:
   *    description: Create project data source
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: dataSourceInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.post('/api/createProjectDataSource', checkAuth, ProjectDataSourcesController.createProjectDataSource);

  /**
   * @swagger
   * /updateProjectDataSource:
   *  patch:
   *    description: Update project data source
   *    parameters:
   *      - name: projectDataSourceId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: dataSourceInfo
   *        in: body
   *        required: true
   *        type: object
   */
  app.patch('/api/updateProjectDataSource', checkAuth, ProjectDataSourcesController.updateProjectDataSource);

  /**
   * @swagger
   * /deleteProjectDataSource:
   *  delete:
   *    description: Delete project data source
   *    parameters:
   *      - name: projectDataSourceId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProjectDataSource', checkAuth, ProjectDataSourcesController.deleteProjectDataSource);
};
