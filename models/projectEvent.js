const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectEventSchema = new Schema({
  name: { type: String, required: true },
  eventInfo: { type: Schema.Types.Mixed, required: true },
  //relations
  project: { type: Schema.Types.ObjectId, ref: 'projects' },
});

projectEventSchema.plugin(timestamps);

mongoose.model('projectEvents', projectEventSchema);
