import mongoose from "mongoose";

const CollaborationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Collaboration || mongoose.model("Collaboration", CollaborationSchema);