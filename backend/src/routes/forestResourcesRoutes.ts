import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// GET all forest resource records
router.get('/', async (req, res) => {
  try {
    const records = await prisma.forest_resources.findMany();
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch forest resource records', details: error.message });
  }
});

// GET all forest resources for a household
router.get('/household/:household_id', async (req, res) => {
  try {
    const records = await prisma.forest_resources.findMany({
      where: { household_id: req.params.household_id },
    });
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch forest resources for household', details: error.message });
  }
});

// GET forest resource by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await prisma.forest_resources.findUnique({
      where: { resource_id: Number(req.params.id) },
    });
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch forest resource record', details: error.message });
  }
});

// CREATE forest resource record
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await prisma.forest_resources.create({ data });
    res.status(201).json(created);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create forest resource record', details: error.message });
  }
});

// UPDATE forest resource record
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.forest_resources.update({
      where: { resource_id: Number(req.params.id) },
      data,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to update forest resource record', details: error.message });
  }
});

// DELETE forest resource record
router.delete('/:id', async (req, res) => {
  try {
    await prisma.forest_resources.delete({
      where: { resource_id: Number(req.params.id) },
    });
    res.json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to delete forest resource record', details: error.message });
  }
});

export default router;
