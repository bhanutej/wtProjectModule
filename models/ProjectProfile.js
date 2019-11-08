const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectProfileSchema = new Schema({
    name: { type: String, enum: ['extraSmall', 'small', 'large', 'extraLarge'], required: true },
    isDefaultProfile: { type: Boolean, default: false },
    //relations
    project: { type: Schema.Types.ObjectId, ref: 'projects' },
    projectPages: [{ type: Schema.Types.ObjectId, ref: 'projectPages' }],
});

projectProfileSchema.plugin(timestamps);

mongoose.model('projectProfiles', projectProfileSchema);
