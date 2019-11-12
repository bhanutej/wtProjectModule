const checkAuth = require('../middleware/checkAuth');
const ProjectProfilesController = require('../controllers/projectProfiles');

module.exports = (app) => {
  /**
   * @swagger
   * /projectProfile:
   *  get:
   *    description: Get project profile information
   *    parameters:
   *      - name: profileId
   *        in: body
   *        required: true
   */
  app.get('/api/projectProfile', checkAuth, ProjectProfilesController.projectProfileInfo);

  /**
   * @swagger
   * /projectProfiles:
   *  get:
   *    description: Get project profiles
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   */
  app.get('/api/projectProfiles', checkAuth, ProjectProfilesController.projectProfiles);

  /**
   * @swagger
   * /createProjectProfile:
   *  post:
   *    description: Create project profile page
   *    parameters:
   *      - name: projectId
   *        in: body
   *        required: true
   *        type: string
   *      - name: name
   *        in: body
   *        required: true
   *        type: string
   *      - name: isDefaultProfile
   *        in: body
   *        required: true
   *        type: boolean
   */
  app.post('/api/createProjectProfile', checkAuth, ProjectProfilesController.createProjectProfile);

  /**
   * @swagger
   * /updateProjectProfile:
   *  patch:
   *    description: Update project profile
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
  app.patch('/api/updateProjectProfile', checkAuth, ProjectProfilesController.updateProjectProfile);

  /**
   * @swagger
   * /deleteProjectProfile:
   *  delete:
   *    description: Delete project profile
   *    parameters:
   *      - name: profileId
   *        in: body
   *        required: true
   *        type: string
   */
  app.delete('/api/deleteProjectProfile', checkAuth, ProjectProfilesController.deleteProjectProfile);
};
