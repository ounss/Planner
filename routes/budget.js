import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const budgets = await Budget.find();
  res.json(budgets);
});

router.get("/:id", async (req, res) => {
  const budget = await Budget.findById(req.params.id);
  if (!budget) return res.status(404).json({ message: "Not found" });
  res.json(budget);
});

router.post("/", async (req, res) => {
  try {
    const budget = new Budget(req.body);
    const saved = await budget.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget entry deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
