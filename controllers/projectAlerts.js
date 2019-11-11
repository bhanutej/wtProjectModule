const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectAlert = mongoose.model('projectAlerts');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  projectAlertInfo: async (req, res, next) => {
    try {
      const projectAlert = await ProjectAlert.findById({_id: req.body.projectAlertId});
      if(projectAlert) {
        res.status(201).json({ message: 'Project Alert Founded', projectAlert });
      } else {
        res.status(404).send({ error: "Project Alert Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT ALERT EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  createProjectAlert: async (req, res, next) => {
    if (req.body.projectId) {
      try {
        const project = await Project.findById({_id: req.body.projectId});
        if (project) {
          const projectAlert = new ProjectAlert(_projectAlertObj(req.body));
          projectAlert.project = project;
          await projectAlert.save();
          project.projectAlerts.push(projectAlert);
          await project.save();
          res.status(201).json({ message: 'Project Alert created', projectAlert });
        } else {
          res.status(404).send({ error: "Project Not Found" });
        }
      } catch (errors) {
        console.log(">>> CREATE PROJECT ALERT EXCEPTIONS >>> ", errors);
        const [handledErrors, statusCode] = handleErrors(errors);
        res.status(statusCode).send(handledErrors);
      }
    } else {
      res.status(404).send({ error: "ProjectID Not Found" });
    }
  },

  updateProjectAlert: async (req, res, next) => {
    try {
      const projectAlert = await ProjectAlert.findById({_id: req.body.projectAlertId});
      if (projectAlert) {
        await projectAlert.updateOne(_projectAlertObj(req.body));
        res.status(200).json({ message: 'Project Alert Updated', projectAlert });
      } else {
        res.status(404).json({ message: 'Project Alert Not Found' });  
      }
    } catch (errors) {
      console.log(">>> UPDATE PROJECT ALERT EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projectAlerts: async (req, res, next) => {
    try {
      const project = await Project.findById({_id: req.body.projectId}).populate('projectAlerts');
      if(project) {
        res.status(200).json({alerts: project.projectAlerts});
      } else {
        res.status(404).send({ error: "Project Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT ALERTS EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  deleteProjectAlert: async (req, res, next) => {
    try {
      const projectAlert = await ProjectAlert.findById({_id: req.body.projectAlertId});
      const project = await Project.findById({_id: projectAlert.project});
      await project.update({ $pull: { projectAlerts: { $in: [req.body.projectAlertId] } } } );
      await projectAlert.deleteOne({_id: req.body.projectAlertId});
      res.status(200).json({message: 'Project Alert deleted'});
    } catch(errors) {
      console.log(">>> DELETE PROJECT ALERT EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  }
};

_projectAlertObj = (profileAlert) => {
  return {
    name: profileAlert.name,
    alertInfo: profileAlert.alertInfo,
  };
}
