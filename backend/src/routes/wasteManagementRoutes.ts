import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// GET all waste management records
router.get('/', async (req, res) => {
  try {
    const records = await prisma.waste_management.findMany();
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch waste management records', details: error.message });
  }
});

// GET all waste management for a household
router.get('/household/:household_id', async (req, res) => {
  try {
    const records = await prisma.waste_management.findMany({
      where: { household_id: req.params.household_id },
    });
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch waste management for household', details: error.message });
  }
});

// GET waste management by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await prisma.waste_management.findUnique({
      where: { waste_id: Number(req.params.id) },
    });
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch waste management record', details: error.message });
  }
});

// CREATE waste management record
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await prisma.waste_management.create({ data });
    res.status(201).json(created);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create waste management record', details: error.message });
  }
});

// UPDATE waste management record
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.waste_management.update({
      where: { waste_id: Number(req.params.id) },
      data,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to update waste management record', details: error.message });
  }
});

// DELETE waste management record
router.delete('/:id', async (req, res) => {
  try {
    await prisma.waste_management.delete({
      where: { waste_id: Number(req.params.id) },
    });
    res.json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to delete waste management record', details: error.message });
  }
});

export default router;
