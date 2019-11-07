const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    //relations
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    projectProfiles: [{ type: Schema.Types.ObjectId, ref: 'projectProfiles' }],
    projectVariables: [{ type: Schema.Types.ObjectId, ref: 'projectVariables' }],
    projectServices: [{ type: Schema.Types.ObjectId, ref: 'projectServices' }],
    projectDataSockets: [{ type: Schema.Types.ObjectId, ref: 'projectDataSockets' }],
    projectAlerts: [{ type: Schema.Types.ObjectId, ref: 'projectAlerts' }],
    projectEvents: [{ type: Schema.Types.ObjectId, ref: 'projectEvents' }],
    projectDataSources: [{ type: Schema.Types.ObjectId, ref: 'projectDataSources' }],
});

projectSchema.plugin(timestamps);

mongoose.model('projects', projectSchema);
