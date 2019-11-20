const mongoose = require('mongoose');

const User = mongoose.model('users');
const Project = mongoose.model('projects');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  projectInfo: async (req, res, next) => {
    try {
      const project = await Project.findById({_id: req.body.projectId});
      if(project) {
        res.status(201).json({ message: 'Project Founded', project });
      } else {
        res.status(404).send({ error: "Project Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT INFO EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  createProject: async (req, res, next) => {
    try {
      const user = await User.findById({_id: req.userData.userId});
      if (user) {
        const project = await new Project(_projectObj(req.body, user));
        await project.save();
        await User.update({ _id: req.userData.userId },{ $push: { projects: project } });
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

  updateProject: async (req, res, next) => {
    try {
      const user = await User.findById({_id: req.userData.userId});
      if(user.projects.includes(req.body.projectId)){
        const project = await Project.findByIdAndUpdate({_id: req.body.projectId}, _projectObj(req.body, user), { new: true, runValidators: true })
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
      res.status(200).json({projects: user.projects});
    } catch (errors) {
      console.log(">>> PROJECTS EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  deleteProject: async (req, res, next) => {
    try {
      const user = await User.findById({_id: req.userData.userId}).populate('projects');
      await user.update({ $pull: { projects: { $in: [req.body.projectId] } } } )
      await Project.deleteOne({_id: req.body.projectId});
      res.status(200).json({ message: "Project Deleted" });
    } catch(errors) {
      console.log(">>> DELETE PROJECT EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  }
};

_projectObj = (project, user) => {
  return {
    name: project.name,
    description: project.description,
    user: user
  };
}
