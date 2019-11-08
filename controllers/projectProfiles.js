const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const ProjectProfile = mongoose.model('projectProfiles');
const { handleErrors, handleUnauthorizedException } = require('../utilities/handlePromise');

module.exports = {
  projectProfileInfo: async (req, res, next) => {
    try {
      const projectProfile = await ProjectProfile.findById({_id: req.body.profileId});
      if(projectProfile) {
        res.status(201).json({ message: 'ProjectProfile Founded', projectProfile });
      } else {
        res.status(404).send({ error: "ProjectProfile Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECT INFO EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  createProjectProfile: async (req, res, next) => {
    if (req.body.projectId) {
      try {
        const project = await Project.findById({_id: req.body.projectId});
        if (project) {
          const projectProfile = new ProjectProfile(_projectProfilesObj(req.body));
          projectProfile.project = project;
          await projectProfile.save();
          project.projectProfiles.push(projectProfile);
          await project.save();
          res.status(201).json({ message: 'Project Profile created', projectProfile });
        } else {
          res.status(404).send({ error: "Project Not Found" });
        }
      } catch (errors) {
        console.log(">>> CREATE PROJECT PROFILE EXCEPTIONS >>> ", errors);
        const [handledErrors, statusCode] = handleErrors(errors);
        res.status(statusCode).send(handledErrors);
      }
    } else {
      res.status(404).send({ error: "ProjectID Not Found" });
    }
  },

  updateProjectProfile: async (req, res, next) => {
    try {
      const projectProfile = await ProjectProfile.findByIdAndUpdate({_id: req.body.profileId}, _projectProfilesObj(req.body), { new: true, runValidators: true })
      if (req.body.isDefaultProfile) {
        _updateIsDefaultProfile(projectProfile, req.body.profileId);
      }
      res.status(200).json({ message: 'Project Profile Updated', projectProfile });
    } catch (errors) {
      console.log(">>> UPDATE PROJECT EXCEPTIONS >>> ", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  projectProfiles: async (req, res, next) => {
    try {
      const project = await Project.findById({_id: req.body.projectId}).populate('projectProfiles');
      if(project) {
        res.status(200).json({profiles: project.projectProfiles});
      } else {
        res.status(404).send({ error: "Project Not Found" });
      }
    } catch (errors) {
      console.log(">>> PROJECTS EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  },

  deleteProjectProfile: async (req, res, next) => {
    try {
      const projectProfile = await ProjectProfile.findById({_id: req.body.profileId});
      const project = await Project.findById({_id: projectProfile.project}).populate('projectProfiles');
      await project.update({ $pull: { projectProfiles: { $in: [req.body.profileId] } } } )
      await ProjectProfile.deleteOne({_id: req.body.projectId});
      res.status(200).json({message: 'Project Profile deleted'});
    } catch(errors) {
      console.log(">>> DELETE PROJECT PROFILE EXCEPTION >>>", errors);
      const [handledErrors, statusCode] = handleErrors(errors);
      res.status(statusCode).send(handledErrors);
    }
  }
};

_projectProfilesObj = (projectProfile) => {
  return {
    name: projectProfile.name,
    isDefaultProfile: projectProfile.isDefaultProfile
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
