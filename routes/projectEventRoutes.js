const checkAuth = require('../middleware/checkAuth');
const ProjectEventsController = require('../controllers/projectEvents');

module.exports = (app) => {
  app.get('/api/projectEvent', checkAuth, ProjectEventsController.projectEventInfo);
  app.get('/api/projectEvents', checkAuth, ProjectEventsController.projectEvents);
  app.post('/api/createProjectEvent', checkAuth, ProjectEventsController.createProjectEvent);
  app.patch('/api/updateProjectEvent', checkAuth, ProjectEventsController.updateProjectEvent);
  app.delete('/api/deleteProjectEvent', checkAuth, ProjectEventsController.deleteProjectEvent);
};
