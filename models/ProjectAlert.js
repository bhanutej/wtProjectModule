const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectAlertSchema = new Schema({
  name: { type: String, required: true },
  alertInfo: { type: Schema.Types.Mixed, required: true },
  //relations
  project: { type: Schema.Types.ObjectId, ref: 'projects' },
});

projectAlertSchema.plugin(timestamps);

mongoose.model('projectAlerts', projectAlertSchema);
