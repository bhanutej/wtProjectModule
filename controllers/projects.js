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
      console.log(">>> CREATE PROJECT EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  update_project: async (req, res, next) => {
    try {
      const user = await User.findById({_id: req.userData.userId});
      if(user.projects.includes(req.params.project_id)){
        const project = await Project.findByIdAndUpdate({_id: req.params.project_id}, _projectObj(req.body), { new: true, runValidators: true })
        res.status(200).json({ message: 'Project Updated', project });
      }
    } catch (errors) {
      console.log(">>> UPDATE PROJECT EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projects: async (req, res, next) => {
    try {
      const user = await User.findById({_id: req.userData.userId}).populate('projects');
      res.status(200).json({address: user.projects});
    } catch (errors) {
      console.log(">>> PROJECTS EXCEPTION >>>", errors);
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
