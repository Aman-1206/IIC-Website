import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role is required.'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required.'],
  },
  category: {
    type: String,
    enum: ['Faculty', 'Student'],
    required: [true, 'Category is required.'],
  },
  // A unique slug for the department page URL, e.g., "marketing-pr"
  departmentSlug: {
    type: String,
    trim: true,
    index: true,
  },
  isDepartmentHead: {
    type: Boolean,
    default: false,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
  birthdayDate: {
    type: Date,
    default: null,
  },
  birthdayActive: {
    type: Boolean,
    default: false,
  },
  // We can add a field for ordering members on the page
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
