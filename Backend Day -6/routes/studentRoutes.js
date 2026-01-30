const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

/* ======================
   CREATE (POST)
   ====================== */
router.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ======================
   READ (GET)
   ====================== */
router.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

/* ======================
   UPDATE (PUT)
   ====================== */
router.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* ======================
   DELETE (DELETE)
   ====================== */
router.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

module.exports = router;
