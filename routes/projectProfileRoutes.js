const checkAuth = require('../middleware/checkAuth');
const ProjectProfilesController = require('../controllers/projectProfiles');

module.exports = (app) => {
  app.post('/api/createProjectProfile', checkAuth, ProjectProfilesController.createProjectProfile);
  app.get('/api/projectProfiles', checkAuth, ProjectProfilesController.projectProfiles);
  app.get('/api/projectProfile', checkAuth, ProjectProfilesController.projectProfileInfo);
  app.patch('/api/updateProjectProfile/', checkAuth, ProjectProfilesController.updateProjectProfile);
  app.delete('/api/deleteProjectProfile', checkAuth, ProjectProfilesController.deleteProjectProfile);
};
