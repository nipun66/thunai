import { Router } from 'express';
import {
  getEmploymentDetails,
  getEmploymentDetail,
  createEmploymentDetail,
  updateEmploymentDetail,
  deleteEmploymentDetail,
} from '../controllers/employmentController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.get('/', async (req, res) => {
  try {
    res.json({ success: true, message: 'Employment details endpoint - to be implemented' });
  } catch (error) {
    console.error('❌ Get employment details error:', error);
    res.status(500).json({ error: 'Failed to fetch employment details' });
  }
});

router.get('/:id', getEmploymentDetail);
router.post('/', createEmploymentDetail);
router.put('/:id', updateEmploymentDetail);
router.delete('/:id', deleteEmploymentDetail);

export default router;
