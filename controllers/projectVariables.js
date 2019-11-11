const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectVariable = mongoose.model('projectVariables');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  projectVariableInfo: async (req, res, next) => {
    try {
      const projectVariable = await ProjectVariable.findById({_id: req.body.projectVariableId});
      if(projectVariable) {
        res.status(201).json({ message: 'Project Variable Founded', projectVariable });
      } else {
        res.status(404).send({ error: "Project Variable Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT INFO EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  createProjectVariable: async (req, res, next) => {
    if (req.body.projectId) {
      try {
        const project = await Project.findById({_id: req.body.projectId});
        if (project) {
          const projectVariable = new ProjectVariable(_projectVariableObj(req.body));
          projectVariable.project = project;
          await projectVariable.save();
          project.projectVariables.push(projectVariable);
          await project.save();
          res.status(201).json({ message: 'Project Variable created', projectVariable });
        } else {
          res.status(404).send({ error: "Project Not Found" });
        }
      } catch (errors) {
        console.log(">>> CREATE PROJECT VARIABLE PAGE EXCEPTIONS >>> ", errors);
        const [handledErrors, statusCode] = handleErrors(errors);
        res.status(statusCode).send(handledErrors);
      }
    } else {
      res.status(404).send({ error: "ProjectID Not Found" });
    }
  },

  updateProjectVariable: async (req, res, next) => {
    try {
      const projectVariable = await ProjectVariable.findById({_id: req.body.projectVariableId});
      if (projectVariable) {
        const aa = await projectVariable.updateOne(_projectVariableObj(req.body));
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", aa);
        res.status(200).json({ message: 'Project Variable Updated', projectVariable });
      } else {
        res.status(404).json({ message: 'Project Variable Not Found' });  
      }
    } catch (errors) {
      console.log(">>> UPDATE PROJECT VARIABLE EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projectVariables: async (req, res, next) => {
    try {
      const project = await Project.findById({_id: req.body.projectId}).populate('projectVariables');
      if(project) {
        res.status(200).json({profiles: project.projectVariables});
      } else {
        res.status(404).send({ error: "Project Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT VARIABLES EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  // deleteProjectProfilePage: async (req, res, next) => {
  //   try {
  //     const projectProfilePage = await ProjectProfilePage.findById({_id: req.body.pageId});
  //     const projectProfile = await ProjectProfile.findById({_id: projectProfilePage.projectProfile});
  //     await projectProfile.update({ $pull: { projectProfilePages: { $in: [req.body.pageId] } } } );
  //     await ProjectProfilePage.deleteOne({_id: req.body.pageId});
  //     res.status(200).json({message: 'Project Profile Page deleted'});
  //   } catch(errors) {
  //     console.log(">>> DELETE PROJECT PROFILE EXCEPTION >>>", errors);
  //     const [handledErrors, statusCode] = handleErrors(errors);
  //     res.status(statusCode).send(handledErrors);
  //   }
  // }
};

_projectVariableObj = (profileVariable) => {
  return {
    name: profileVariable.name,
    variableInfo: profileVariable.variableInfo,
  };
}

_updateIsDefaultProfile = async (projectProfile, profileId) => {
  const projectId = projectProfile.project;
  const project = await Project.findById({_id: projectId}).populate('projectProfiles');
  project.projectProfiles.forEach(async profile => {
    if(profile._id != profileId) {
      profile.isDefaultProfile = false;
      await profile.save();
    }
  });
}
