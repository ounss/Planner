import express from "express";
import Guest from "../models/Guest.js";

const router = express.Router();

// GET all guests
router.get("/", async (req, res) => {
  const guests = await Guest.find().populate("weddingId");
  res.json(guests);
});

// GET guests by wedding ID
router.get("/wedding/:weddingId", async (req, res) => {
  const guests = await Guest.find({ weddingId: req.params.weddingId });
  res.json(guests);
});

// GET single guest
router.get("/:id", async (req, res) => {
  const guest = await Guest.findById(req.params.id);
  if (!guest) return res.status(404).json({ message: "Not found" });
  res.json(guest);
});

// POST create guest
router.post("/", async (req, res) => {
  try {
    const guest = new Guest(req.body);
    const saved = await guest.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update guest
router.put("/:id", async (req, res) => {
  try {
    const updated = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE guest
router.delete("/:id", async (req, res) => {
  try {
    await Guest.findByIdAndDelete(req.params.id);
    res.json({ message: "Guest deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
