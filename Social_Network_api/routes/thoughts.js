const express = require('express');
const Thought = require('../models/Thought');
const router = express.Router();

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new thought
router.post('/', async (req, res) => {
  const { thoughtText, username } = req.body;

  try {
    const newThought = await Thought.create({ thoughtText, username });
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  try {
    const { thoughtText } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      { thoughtText },
      { new: true }
    );

    if (updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndRemove(req.params.id);

    if (deletedThought) {
      res.json({ message: 'Thought removed' });
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
