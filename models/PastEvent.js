// 1. /models/PastEvent.js
import mongoose from "mongoose";

const PastEventSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export default mongoose.models.PastEvent || mongoose.model("PastEvent", PastEventSchema);
