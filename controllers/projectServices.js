const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectService = mongoose.model('projectServices');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  projectServiceInfo: async (req, res, next) => {
    try {
      const projectService = await ProjectService.findById({_id: req.body.projectServiceId});
      if(projectService) {
        res.status(201).json({ message: 'Project Service Founded', projectService });
      } else {
        res.status(404).send({ error: "Project Service Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT SERVICE INFO EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  createProjectService: async (req, res, next) => {
    if (req.body.projectId) {
      try {
        const project = await Project.findById({_id: req.body.projectId});
        if (project) {
          const projectService = new ProjectService(_projectServiceObj(req.body, project));
          await projectService.save();
          await Project.update({ _id: req.body.projectId },{ $push: { projectServices: projectService } });
          res.status(201).json({ message: 'Project Service created', projectService });
        } else {
          res.status(404).send({ error: "Project Not Found" });
        }
      } catch (errors) {
        console.log(">>> CREATE PROJECT SERVICE EXCEPTIONS >>> ", errors);
        const [handledErrors, statusCode] = handleErrors(errors);
        res.status(statusCode).send(handledErrors);
      }
    } else {
      res.status(404).send({ error: "ProjectID Not Found" });
    }
  },

  updateProjectService: async (req, res, next) => {
    try {
      const projectService = await ProjectService.findById({_id: req.body.projectServiceId});
      if (projectService) {
        await projectService.updateOne(_projectServiceObj(req.body));
        res.status(200).json({ message: 'Project Service Updated', projectService });
      } else {
        res.status(404).json({ message: 'Project Service Not Found' });  
      }
    } catch (errors) {
      console.log(">>> UPDATE PROJECT SERVICE EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projectServices: async (req, res, next) => {
    try {
      const project = await Project.findById({_id: req.body.projectId}).populate('projectServices');
      if(project) {
        res.status(200).json({services: project.projectServices});
      } else {
        res.status(404).send({ error: "Project Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT SERVICES EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  deleteProjectService: async (req, res, next) => {
    try {
      const projectService = await ProjectService.findById({_id: req.body.projectServiceId});
      const project = await Project.findById({_id: projectService.project});
      await project.update({ $pull: { projectServices: { $in: [req.body.projectServiceId] } } } );
      await projectService.deleteOne({_id: req.body.projectServiceId});
      res.status(200).json({message: 'Project Service deleted'});
    } catch(errors) {
      console.log(">>> DELETE PROJECT SERVICE EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  }
};

_projectServiceObj = (profileService, project = null) => {
  if (project) {
    return {
      name: profileService.name,
      serviceInfo: profileService.serviceInfo,
      project: project
    };
  }
  return {
    name: profileService.name,
    serviceInfo: profileService.serviceInfo
  };
};
