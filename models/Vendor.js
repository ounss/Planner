import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  contact: { type: String, required: true },
});

export default mongoose.model("Vendor", vendorSchema);
