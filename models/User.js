const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    userType: { type: String, enum: ['SuperAdmin', 'Admin', 'User'], default: 'User' },
    // relations
    projects: [{ type: Schema.Types.ObjectId, ref: 'projects' }],
});

userSchema.plugin(timestamps);

mongoose.model('users', userSchema);
