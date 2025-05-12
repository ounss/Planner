import express from "express";
import Wedding from "../models/Wedding.js";

const router = express.Router();

// GET all weddings
router.get("/", async (req, res) => {
  const weddings = await Wedding.find();
  res.json(weddings);
});

// GET single wedding
router.get("/:id", async (req, res) => {
  const wedding = await Wedding.findById(req.params.id);
  if (!wedding) return res.status(404).json({ message: "Not found" });
  res.json(wedding);
});

// POST new wedding
router.post("/", async (req, res) => {
  try {
    const wedding = new Wedding(req.body);
    const saved = await wedding.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update wedding
router.put("/:id", async (req, res) => {
  try {
    const updated = await Wedding.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE wedding
router.delete("/:id", async (req, res) => {
  try {
    await Wedding.findByIdAndDelete(req.params.id);
    res.json({ message: "Wedding deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
