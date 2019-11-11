const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectEvent = mongoose.model('projectEvents');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  projectEventInfo: async (req, res, next) => {
    try {
      const projectEvent = await ProjectEvent.findById({_id: req.body.projectEventId});
      if(projectEvent) {
        res.status(201).json({ message: 'Project Event Founded', projectEvent });
      } else {
        res.status(404).send({ error: "Project Event Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT EVENT EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  createProjectEvent: async (req, res, next) => {
    if (req.body.projectId) {
      try {
        const project = await Project.findById({_id: req.body.projectId});
        if (project) {
          const projectEvent = new ProjectEvent(_projectEventObj(req.body));
          projectEvent.project = project;
          await projectEvent.save();
          project.projectEvents.push(projectEvent);
          await project.save();
          res.status(201).json({ message: 'Project Event created', projectEvent });
        } else {
          res.status(404).send({ error: "Project Not Found" });
        }
      } catch (errors) {
        console.log(">>> CREATE PROJECT EVENT EXCEPTIONS >>> ", errors);
        const [handledErrors, statusCode] = handleErrors(errors);
        res.status(statusCode).send(handledErrors);
      }
    } else {
      res.status(404).send({ error: "ProjectID Not Found" });
    }
  },

  updateProjectEvent: async (req, res, next) => {
    try {
      const projectEvent = await ProjectEvent.findById({_id: req.body.projectEventId});
      if (projectEvent) {
        await projectEvent.updateOne(_projectEventObj(req.body));
        res.status(200).json({ message: 'Project Event Updated', projectEvent });
      } else {
        res.status(404).json({ message: 'Project Event Not Found' });  
      }
    } catch (errors) {
      console.log(">>> UPDATE PROJECT EVENT EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projectEvents: async (req, res, next) => {
    try {
      const project = await Project.findById({_id: req.body.projectId}).populate('projectEvents');
      if(project) {
        res.status(200).json({Events: project.projectEvents});
      } else {
        res.status(404).send({ error: "Project Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT EVENS EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  deleteProjectEvent: async (req, res, next) => {
    try {
      const projectEvent = await ProjectEvent.findById({_id: req.body.projectEventId});
      const project = await Project.findById({_id: projectEvent.project});
      await project.update({ $pull: { projectEvents: { $in: [req.body.projectEventId] } } } );
      await projectEvent.deleteOne({_id: req.body.projectEventId});
      res.status(200).json({message: 'Project Event deleted'});
    } catch(errors) {
      console.log(">>> DELETE PROJECT EVENT EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  }
};

_projectEventObj = (projectEvent) => {
  return {
    name: projectEvent.name,
    eventInfo: projectEvent.eventInfo,
  };
}
