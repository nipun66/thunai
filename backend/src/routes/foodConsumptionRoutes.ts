import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// GET all food consumption records
router.get('/', async (req, res) => {
  try {
    const records = await prisma.food_consumption.findMany();
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch food consumption records', details: error.message });
  }
});

// GET food consumption by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await prisma.food_consumption.findUnique({
      where: { consumption_id: Number(req.params.id) },
    });
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch food consumption record', details: error.message });
  }
});

// GET all food consumption for a household
router.get('/household/:household_id', async (req, res) => {
  try {
    const records = await prisma.food_consumption.findMany({
      where: { household_id: req.params.household_id },
    });
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch food consumption for household', details: error.message });
  }
});

// CREATE food consumption record
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await prisma.food_consumption.create({ data });
    res.status(201).json(created);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create food consumption record', details: error.message });
  }
});

// UPDATE food consumption record
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.food_consumption.update({
      where: { consumption_id: Number(req.params.id) },
      data,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to update food consumption record', details: error.message });
  }
});

// DELETE food consumption record
router.delete('/:id', async (req, res) => {
  try {
    await prisma.food_consumption.delete({
      where: { consumption_id: Number(req.params.id) },
    });
    res.json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to delete food consumption record', details: error.message });
  }
});

export default router;
