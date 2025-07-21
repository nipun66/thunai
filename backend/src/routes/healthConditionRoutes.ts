import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// GET all health condition records
router.get('/', async (req, res) => {
  try {
    const records = await prisma.health_conditions.findMany();
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch health condition records', details: error.message });
  }
});

// GET all health conditions for a household
router.get('/household/:household_id', async (req, res) => {
  try {
    const records = await prisma.health_conditions.findMany({
      where: { household_id: req.params.household_id },
    });
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch health conditions for household', details: error.message });
  }
});

// GET health condition by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await prisma.health_conditions.findUnique({
      where: { condition_id: Number(req.params.id) },
    });
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch health condition record', details: error.message });
  }
});

// CREATE health condition record
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await prisma.health_conditions.create({ data });
    res.status(201).json(created);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create health condition record', details: error.message });
  }
});

// UPDATE health condition record
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.health_conditions.update({
      where: { condition_id: Number(req.params.id) },
      data,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to update health condition record', details: error.message });
  }
});

// DELETE health condition record
router.delete('/:id', async (req, res) => {
  try {
    await prisma.health_conditions.delete({
      where: { condition_id: Number(req.params.id) },
    });
    res.json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to delete health condition record', details: error.message });
  }
});

export default router;
