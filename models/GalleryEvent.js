import mongoose from "mongoose";

const GalleryEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // Now user-defined, not auto-filled
  images: [{ type: String }],
});

export default mongoose.models.GalleryEvent ||
  mongoose.model("GalleryEvent", GalleryEventSchema);
