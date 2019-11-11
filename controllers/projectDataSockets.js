const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectDataSocket = mongoose.model('projectDataSockets');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  projectDataSocketInfo: async (req, res, next) => {
    try {
      const projectDataSocket = await ProjectDataSocket.findById({_id: req.body.projectDataSocketId});
      if(projectDataSocket) {
        res.status(201).json({ message: 'Project DataSocket Founded', projectDataSocket });
      } else {
        res.status(404).send({ error: "Project DataSocket Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT DATA SOCKET EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  createProjectDataSocket: async (req, res, next) => {
    if (req.body.projectId) {
      try {
        const project = await Project.findById({_id: req.body.projectId});
        if (project) {
          const projectDataSocket = new ProjectDataSocket(_projectDataSocketObj(req.body));
          projectDataSocket.project = project;
          await projectDataSocket.save();
          project.projectDataSockets.push(projectDataSocket);
          await project.save();
          res.status(201).json({ message: 'Project DataSocket created', projectDataSocket });
        } else {
          res.status(404).send({ error: "Project Not Found" });
        }
      } catch (errors) {
        console.log(">>> CREATE PROJECT DATA SOCKET EXCEPTIONS >>> ", errors);
        const [handledErrors, statusCode] = handleErrors(errors);
        res.status(statusCode).send(handledErrors);
      }
    } else {
      res.status(404).send({ error: "ProjectID Not Found" });
    }
  },

  updateProjectDataSocket: async (req, res, next) => {
    try {
      const projectDataSocket = await ProjectDataSocket.findById({_id: req.body.projectDataSocketId});
      if (projectDataSocket) {
        await projectDataSocket.updateOne(_projectDataSocketObj(req.body));
        res.status(200).json({ message: 'Project DataSocket Updated', projectDataSocket });
      } else {
        res.status(404).json({ message: 'Project DataSocket Not Found' });  
      }
    } catch (errors) {
      console.log(">>> UPDATE PROJECT DATA SOCKET EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projectDataSockets: async (req, res, next) => {
    try {
      const project = await Project.findById({_id: req.body.projectId}).populate('projectDataSockets');
      if(project) {
        res.status(200).json({DataSockets: project.projectDataSockets});
      } else {
        res.status(404).send({ error: "Project Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT DATA SOCKET EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  deleteProjectDataSocket: async (req, res, next) => {
    try {
      const projectDataSocket = await ProjectDataSocket.findById({_id: req.body.projectDataSocketId});
      const project = await Project.findById({_id: projectDataSocket.project});
      await project.update({ $pull: { projectDataSockets: { $in: [req.body.projectDataSocketId] } } } );
      await projectDataSocket.deleteOne({_id: req.body.projectDataSocketId});
      res.status(200).json({message: 'Project DataSocket deleted'});
    } catch(errors) {
      console.log(">>> DELETE PROJECT DATA SOCKET EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  }
};

_projectDataSocketObj = (projectDataSocket) => {
  return {
    name: projectDataSocket.name,
    socketInfo: projectDataSocket.socketInfo,
  };
}
