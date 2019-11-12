const checkAuth = require('../middleware/checkAuth');
const projectProfilePagesController = require('../controllers/projectProfilePages');

module.exports = (app) => {
  /**
   * @swagger
   * /projectProfilePage:
   *  get:
   *    description: Get project profile page information
   *    parameters:
   *      - name: pageId
   *        in: body
   *        required: true
   */
  app.get('/api/projectProfilePage', checkAuth, projectProfilePagesController.projectProfilePageInfo);

  /**
   * @swagger
   * /projectProfilePages:
   *  get:
   *    description: Get project profile pages
   *    parameters:
   *      - name: profileId
   *        in: body
   *        required: true
   */
  app.get('/api/projectProfilePages', checkAuth, projectProfilePagesController.projectProfilePages);

  /**
   * @swagger
   * /createProjectProfilePage:
   *  post:
   *    description: Create project profile page
   *    parameters:
   *      - name: profileId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: structure
   *        in: body
   *        required: true
   *        type: object
   *      - name: elements
   *        in: body
   *        required: true
   *        type: object
   */
  app.post('/api/createProjectProfilePage', checkAuth, projectProfilePagesController.createProjectProfilePage);

  /**
   * @swagger
   * /updateProjectProfilePage:
   *  patch:
   *    description: Update project event
   *    parameters:
   *      - name: pageId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: structure
   *        in: body
   *        required: true
   *        type: object
   *      - name: elements
   *        in: body
   *        required: true
   *        type: object
   */
  app.patch('/api/updateProjectProfilePage', checkAuth, projectProfilePagesController.updateProjectProfilePage);

  /**
   * @swagger
   * /deleteProjectProfilePage:
   *  delete:
   *    description: Delete project profile page
   *    parameters:
   *      - name: pageId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProjectProfilePage', checkAuth, projectProfilePagesController.deleteProjectProfilePage);
};
