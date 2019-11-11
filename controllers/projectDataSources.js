const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectDataSource = mongoose.model('projectDataSources');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  projectDataSourceInfo: async (req, res, next) => {
    try {
      const projectDataSource = await ProjectDataSource.findById({_id: req.body.projectDataSourceId});
      if(projectDataSource) {
        res.status(201).json({ message: 'Project DataSource Founded', projectDataSource });
      } else {
        res.status(404).send({ error: "Project DataSource Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT DATA SOURCE EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  createProjectDataSource: async (req, res, next) => {
    if (req.body.projectId) {
      try {
        const project = await Project.findById({_id: req.body.projectId});
        if (project) {
          const projectDataSource = new ProjectDataSource(_projectDataSourceObj(req.body));
          projectDataSource.project = project;
          await projectDataSource.save();
          project.projectDataSources.push(projectDataSource);
          await project.save();
          res.status(201).json({ message: 'Project DataSource created', projectDataSource });
        } else {
          res.status(404).send({ error: "Project Not Found" });
        }
      } catch (errors) {
        console.log(">>> CREATE PROJECT DATA SOURCE EXCEPTIONS >>> ", errors);
        const [handledErrors, statusCode] = handleErrors(errors);
        res.status(statusCode).send(handledErrors);
      }
    } else {
      res.status(404).send({ error: "ProjectID Not Found" });
    }
  },

  updateProjectDataSource: async (req, res, next) => {
    try {
      const projectDataSource = await ProjectDataSource.findById({_id: req.body.projectDataSourceId});
      if (projectDataSource) {
        await projectDataSource.updateOne(_projectDataSourceObj(req.body));
        res.status(200).json({ message: 'Project DataSource Updated', projectDataSource });
      } else {
        res.status(404).json({ message: 'Project DataSource Not Found' });  
      }
    } catch (errors) {
      console.log(">>> UPDATE PROJECT DATA SOURCE EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projectDataSources: async (req, res, next) => {
    try {
      const project = await Project.findById({_id: req.body.projectId}).populate('projectDataSources');
      if(project) {
        res.status(200).json({DataSources: project.projectDataSources});
      } else {
        res.status(404).send({ error: "Project Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT DATA SOURCE EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  deleteProjectDataSource: async (req, res, next) => {
    try {
      const projectDataSource = await ProjectDataSource.findById({_id: req.body.projectDataSourceId});
      const project = await Project.findById({_id: projectDataSource.project});
      await project.update({ $pull: { projectDataSources: { $in: [req.body.projectDataSourceId] } } } );
      await projectDataSource.deleteOne({_id: req.body.projectDataSourceId});
      res.status(200).json({message: 'Project DataSource deleted'});
    } catch(errors) {
      console.log(">>> DELETE PROJECT DATA SOURCE EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  }
};

_projectDataSourceObj = (projectDataSource) => {
  return {
    name: projectDataSource.name,
    dataSourceInfo: projectDataSource.dataSourceInfo,
  };
}
