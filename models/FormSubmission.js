// models/FormSubmission.js
import mongoose from 'mongoose';

const FormSubmissionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // idea | collaboration | proposal | other
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  extra: { type: Object, default: {} }, // optional extra fields
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.FormSubmission ||
  mongoose.model('FormSubmission', FormSubmissionSchema);
