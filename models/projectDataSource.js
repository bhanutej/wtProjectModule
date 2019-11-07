const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectDataSourceSchema = new Schema({
  name: { type: String, required: true },
  dataSourceInfo: { type: Schema.Types.Mixed, required: true },
  //relations
  project: { type: Schema.Types.ObjectId, ref: 'projects' },
});

projectDataSourceSchema.plugin(timestamps);

mongoose.model('projectDataSources', projectDataSourceSchema);
