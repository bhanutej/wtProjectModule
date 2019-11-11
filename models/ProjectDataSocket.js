const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectDataSocketSchema = new Schema({
  name: { type: String, required: true },
  socketInfo: { type: Schema.Types.Mixed, required: true },
  //relations
  project: { type: Schema.Types.ObjectId, ref: 'projects' },
});

projectDataSocketSchema.plugin(timestamps);

mongoose.model('projectDataSockets', projectDataSocketSchema);
