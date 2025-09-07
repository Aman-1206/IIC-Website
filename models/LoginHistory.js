// models/LoginHistory.js
import mongoose from 'mongoose';

const LoginHistorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LoginHistory || mongoose.model('LoginHistory', LoginHistorySchema);