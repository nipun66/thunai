import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// GET all cash crops records
router.get('/', async (req, res) => {
  try {
    const records = await prisma.cash_crops.findMany();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cash crops records', details: error.message });
  }
});

// GET all cash crops for a household
router.get('/household/:household_id', async (req, res) => {
  try {
    const records = await prisma.cash_crops.findMany({
      where: { household_id: req.params.household_id },
    });
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch cash crops for household', details: error.message });
  }
});

// GET cash crop by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await prisma.cash_crops.findUnique({
      where: { crop_id: Number(req.params.id) },
    });
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cash crop record', details: error.message });
  }
});

// CREATE cash crop record
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await prisma.cash_crops.create({ data });
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create cash crop record', details: error.message });
  }
});

// UPDATE cash crop record
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.cash_crops.update({
      where: { crop_id: Number(req.params.id) },
      data,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update cash crop record', details: error.message });
  }
});

// DELETE cash crop record
router.delete('/:id', async (req, res) => {
  try {
    await prisma.cash_crops.delete({
      where: { crop_id: Number(req.params.id) },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete cash crop record', details: error.message });
  }
});

export default router;
