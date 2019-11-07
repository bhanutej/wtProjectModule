const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectPageSchema = new Schema({
  name: { type: String, required: true },
  structure: { type: Schema.Types.Mixed, required: true },
  elements: { type: Schema.Types.Mixed, required: true },
  //relations
  projectProfile: { type: Schema.Types.ObjectId, ref: 'projectProfiles' },
});

projectPageSchema.plugin(timestamps);

mongoose.model('projectPages', projectPageSchema);
