const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectServiceSchema = new Schema({
  name: { type: String, required: true },
  serviceInfo: { type: Schema.Types.Mixed, required: true },
  //relations
  project: { type: Schema.Types.ObjectId, ref: 'projects' },
});

projectServiceSchema.plugin(timestamps);

mongoose.model('projectServices', projectServiceSchema);
