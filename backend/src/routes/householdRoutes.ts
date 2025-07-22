/**
 * @swagger
 * tags:
 *   name: Households
 *   description: Household management and CRUD operations
 */

/**
 * @swagger
 * /api/households:
 *   get:
 *     summary: Get all households
 *     tags: [Households]
 *     responses:
 *       200:
 *         description: List of households
 *   post:
 *     summary: Create a new household
 *     tags: [Households]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Household created
 *
 * /api/households/{household_id}:
 *   get:
 *     summary: Get a household by ID
 *     tags: [Households]
 *     parameters:
 *       - in: path
 *         name: household_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Household data
 *   put:
 *     summary: Update a household by ID
 *     tags: [Households]
 *     parameters:
 *       - in: path
 *         name: household_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Household updated
 *   delete:
 *     summary: Delete a household by ID
 *     tags: [Households]
 *     parameters:
 *       - in: path
 *         name: household_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Household deleted
 */

import { Router } from 'express';
import {
  getHouseholds,
  getHousehold,
  createHousehold,
  updateHousehold,
  deleteHousehold,
  debugHouseholdData,
} from '../controllers/householdController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/rbacMiddleware';

const router = Router();

// Public routes (no authentication required)
router.get('/', getHouseholds);
router.get('/:household_id', getHousehold);
router.post('/', requireRole([2]), createHousehold);

// Protected routes (authentication required)
router.use(authenticateJWT);

// POST /api/households/debug - Debug data transformation
router.post('/debug', debugHouseholdData);

// PUT /api/households/:id - Update household
router.put('/:household_id', requireRole([2]), updateHousehold);

// DELETE /api/households/:id - Delete household (soft delete)
router.delete('/:household_id', requireRole([2]), deleteHousehold);

export default router;
