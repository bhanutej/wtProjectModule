const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    //relations
    user: { type: Schema.Types.ObjectId, ref: 'users' }, // belongs_to: useer
    projectProfiles: [{ type: Schema.Types.ObjectId, ref: 'projectProfiles' }], // has_many: projectProfiles
    projectVariables: [{ type: Schema.Types.ObjectId, ref: 'projectVariables' }], // has_many: projectVariables
    projectServices: [{ type: Schema.Types.ObjectId, ref: 'projectServices' }], // has_many: projectServices
    projectDataSockets: [{ type: Schema.Types.ObjectId, ref: 'projectDataSockets' }], // has_many: projectDataSockets
    projectAlerts: [{ type: Schema.Types.ObjectId, ref: 'projectAlerts' }], // has_many: projectAlerts
    projectEvents: [{ type: Schema.Types.ObjectId, ref: 'projectEvents' }], // has_many: projectEvents
    projectDataSources: [{ type: Schema.Types.ObjectId, ref: 'projectDataSources' }], // has_many: projectDataSources
});

projectSchema.plugin(timestamps);

mongoose.model('projects', projectSchema);
