import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// GET all nutrition access records
router.get('/', async (req, res) => {
  try {
    const records = await prisma.nutrition_access.findMany();
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch nutrition access records', details: error.message });
  }
});

// GET all nutrition access for a household
router.get('/household/:household_id', async (req, res) => {
  try {
    const records = await prisma.nutrition_access.findMany({
      where: { household_id: req.params.household_id },
    });
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch nutrition access for household', details: error.message });
  }
});

// GET nutrition access by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await prisma.nutrition_access.findUnique({
      where: { nutrition_id: Number(req.params.id) },
    });
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch nutrition access record', details: error.message });
  }
});

// CREATE nutrition access record
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await prisma.nutrition_access.create({ data });
    res.status(201).json(created);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create nutrition access record', details: error.message });
  }
});

// UPDATE nutrition access record
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.nutrition_access.update({
      where: { nutrition_id: Number(req.params.id) },
      data,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to update nutrition access record', details: error.message });
  }
});

// DELETE nutrition access record
router.delete('/:id', async (req, res) => {
  try {
    await prisma.nutrition_access.delete({
      where: { nutrition_id: Number(req.params.id) },
    });
    res.json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to delete nutrition access record', details: error.message });
  }
});

export default router;
