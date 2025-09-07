import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: {
  type: String,
  enum: ['admin', 'moderator', 'member'], // Defines the possible roles
  default: 'member', // New users will be a 'member' by default
},
  members: [{ type: String }] ,
  permissions: {
    event: { type: Boolean, default: false },
    collaboration: { type: Boolean, default: false },
    sponsor: { type: Boolean, default: false },
    webinars: { type: Boolean, default: false },
    past_events: { type: Boolean, default: false },
    gallery: { type: Boolean, default: false },
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
