import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rsvp: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["invited", "confirmed", "declined"],
    default: "invited",
  },
  weddingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wedding",
    required: true,
  },
});

export default mongoose.model("Guest", guestSchema);
