const checkAuth = require('../middleware/checkAuth');
const ProjectsController = require('../controllers/projects');

module.exports = (app) => {
  /**
   * @swagger
   * /project:
   *  get:
   *    description: Get project information
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   */
  app.get('/api/project', checkAuth, ProjectsController.projectInfo);

  /**
   * @swagger
   * /projects:
   *  get:
   *    description: Get projects
   */
  app.get('/api/projects', checkAuth, ProjectsController.projects);

  /**
   * @swagger
   * /createProject:
   *  post:
   *    description: Create project
   *    parameters:
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: description
   *        in: body
   *        required: true
   *        type: string
   */
  app.post('/api/createProject', checkAuth, ProjectsController.createProject);

  /**
   * @swagger
   * /updateProject:
   *  patch:
   *    description: Update project
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: description
   *        in: body
   *        required: true
   *        type: string
   */
  app.patch('/api/updateProject', checkAuth, ProjectsController.updateProject);

  /**
   * @swagger
   * /deleteProject:
   *  delete:
   *    description: Delete project
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProject', checkAuth, ProjectsController.deleteProject);
};
