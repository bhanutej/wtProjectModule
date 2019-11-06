const mongoose = require('mongoose');

const User = mongoose.model('users');
const Project = mongoose.model('projects');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  create_project: async (req, res, next) => {
    try {
      const user = await User.findById({_id: req.userData.userId});
      if (user) {
        const project = new Project(_projectObj(req.body));
        project.user = user;
        await project.save();
        user.projects.push(project);
        await user.save();
        res.status(201).json({ message: 'Project created', project });
      } else {
        res.status(404).send({ error: "User Not Found" });
      }
    } catch (errors) {
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  }
};

_projectObj = (project) => {
  return {
    name: project.name,
    description: project.description
  };
}
