const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectProfile = mongoose.model('projectProfiles');
const ProjectProfilePage = mongoose.model('projectProfilePages');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  // projectProfileInfo: async (req, res, next) => {
  //   try {
  //     const projectProfile = await ProjectProfile.findById({_id: req.body.profileId});
  //     if(projectProfile) {
  //       res.status(201).json({ message: 'ProjectProfile Founded', projectProfile });
  //     } else {
  //       res.status(404).send({ error: "ProjectProfile Not Found" });
  //     }
  //   } catch (errors) {
  //     console.log(">>> PROJECT INFO EXCEPTIONS >>> ", errors);
  //     const [handledErrors, statusCode] = handleErrors(errors);
  //     res.status(statusCode).send(handledErrors);
  //   }
  // },

  createProjectProfilePage: async (req, res, next) => {
    if (req.body.profileId) {
      try {
        const projectProfile = await ProjectProfile.findById({_id: req.body.profileId});
        if (projectProfile) {
          const projectProfilePage = new ProjectProfilePage(_projectProfilePageObj(req.body));
          projectProfilePage.projectProfile = projectProfile;
          await projectProfilePage.save();
          projectProfile.projectProfilePages.push(projectProfilePage);
          await projectProfile.save();
          res.status(201).json({ message: 'Project Profile Page created', projectProfilePage });
        } else {
          res.status(404).send({ error: "Project Profile Not Found" });
        }
      } catch (errors) {
        console.log(">>> CREATE PROJECT PROFILE PAGE EXCEPTIONS >>> ", errors);
        const [handledErrors, statusCode] = handleErrors(errors);
        res.status(statusCode).send(handledErrors);
      }
    } else {
      res.status(404).send({ error: "ProfileID Not Found" });
    }
  },

  updateProjectProfilePage: async (req, res, next) => {
    try {
      const projectProfilePage = await ProjectProfilePage.findByIdAndUpdate({_id: req.body.pageId}, _projectProfilePageObj(req.body), { new: true, runValidators: true })
      res.status(200).json({ message: 'Project Profile Page Updated', projectProfilePage });
    } catch (errors) {
      console.log(">>> UPDATE PROJECT PROFILE PAGE EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projectProfilePages: async (req, res, next) => {
    try {
      const projectProfile = await ProjectProfile.findById({_id: req.body.profileId}).populate('projectProfilePages');
      if(projectProfile) {
        res.status(200).json({profiles: projectProfile.projectProfilePages});
      } else {
        res.status(404).send({ error: "Project Profile Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT PROFILE PAGES EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  // deleteProjectProfile: async (req, res, next) => {
  //   try {
  //     const projectProfile = await ProjectProfile.findById({_id: req.body.profileId});
  //     const project = await Project.findById({_id: projectProfile.project}).populate('projectProfiles');
  //     await project.update({ $pull: { projectProfiles: { $in: [req.body.profileId] } } } )
  //     await ProjectProfile.deleteOne({_id: req.body.projectId});
  //     res.status(200).json({message: 'Project Profile deleted'});
  //   } catch(errors) {
  //     console.log(">>> DELETE PROJECT PROFILE EXCEPTION >>>", errors);
  //     const [handledErrors, statusCode] = handleErrors(errors);
  //     res.status(statusCode).send(handledErrors);
  //   }
  // }
};

_projectProfilePageObj = (profilePage) => {
  return {
    name: profilePage.name,
    structure: profilePage.structure,
    elements: profilePage.elements,
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