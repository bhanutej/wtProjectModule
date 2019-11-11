const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectVariableSchema = new Schema({
  name: { type: String, required: true },
  variableInfo: { type: Schema.Types.Mixed, required: true },
  //relations
  project: { type: Schema.Types.ObjectId, ref: 'projects' },
});

projectVariableSchema.plugin(timestamps);

mongoose.model('projectVariables', projectVariableSchema);
