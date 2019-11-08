const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectVariable = mongoose.model('projectVariables');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  // projectProfilePageInfo: async (req, res, next) => {
  //   try {
  //     const projectProfilePage = await ProjectProfilePage.findById({_id: req.body.pageId});
  //     if(projectProfilePage) {
  //       res.status(201).json({ message: 'Project Profile Page Founded', projectProfilePage });
  //     } else {
  //       res.status(404).send({ error: "Project Profile Page Not Found" });
  //     }
  //   } catch (errors) {
  //     console.log(">>> PROJECT INFO EXCEPTIONS >>> ", errors);
  //     const [handledErrors, statusCode] = handleErrors(errors);
  //     res.status(statusCode).send(handledErrors);
  //   }
  // },

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

  // updateProjectProfilePage: async (req, res, next) => {
  //   try {
  //     const projectProfilePage = await ProjectProfilePage.findByIdAndUpdate({_id: req.body.pageId}, _projectProfilePageObj(req.body), { new: true, runValidators: true })
  //     res.status(200).json({ message: 'Project Profile Page Updated', projectProfilePage });
  //   } catch (errors) {
  //     console.log(">>> UPDATE PROJECT PROFILE PAGE EXCEPTIONS >>> ", errors);
  //     const [handledErrors, statusCode] = handleErrors(errors);
  //     res.status(statusCode).send(handledErrors);
  //   }
  // },

  // projectProfilePages: async (req, res, next) => {
  //   try {
  //     const projectProfile = await ProjectProfile.findById({_id: req.body.profileId}).populate('projectProfilePages');
  //     if(projectProfile) {
  //       res.status(200).json({profiles: projectProfile.projectProfilePages});
  //     } else {
  //       res.status(404).send({ error: "Project Profile Not Found" });
  //     }
  //   } catch (errors) {
  //     console.log(">>> PROJECT PROFILE PAGES EXCEPTION >>>", errors);
  //     const [handledErrors, statusCode] = handleErrors(errors);
  //     res.status(statusCode).send(handledErrors);
  //   }
  // },

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