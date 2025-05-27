import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

router.get("/:id", async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return res.status(404).json({ message: "Not found" });
  res.json(vendor);
});

router.post("/", async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    const saved = await vendor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
