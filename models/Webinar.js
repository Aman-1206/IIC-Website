import mongoose from "mongoose";

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
}, { _id: false });

const WebinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speakers: [SpeakerSchema],
  date: { type: Date, required: true },
  time: { type: String, required: true },
  thumbnail: { type: String }, // URL of image
  webinarLink: { type: String }, // Zoom/Meet link
  youtubeLink: { type: String }, // YouTube recording link
}, { timestamps: true });

export default mongoose.models.Webinar || mongoose.model("Webinar", WebinarSchema);
