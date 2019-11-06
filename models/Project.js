const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    //relations
    user: { type: Schema.Types.ObjectId, ref: 'users' },
});

projectSchema.plugin(timestamps);

mongoose.model('projects', projectSchema);
