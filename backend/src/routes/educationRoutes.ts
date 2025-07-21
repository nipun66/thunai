import { Router } from 'express';
import {
  getEducationDetails,
  getEducationDetail,
  createEducationDetail,
  updateEducationDetail,
  deleteEducationDetail,
} from '../controllers/educationController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.get('/', async (req, res) => {
  try {
    res.json({ success: true, message: 'Education details endpoint - to be implemented' });
  } catch (error) {
    console.error('❌ Get education details error:', error);
    res.status(500).json({ error: 'Failed to fetch education details' });
  }
});

router.get('/:id', getEducationDetail);
router.post('/', createEducationDetail);
router.put('/:id', updateEducationDetail);
router.delete('/:id', deleteEducationDetail);

export default router;
