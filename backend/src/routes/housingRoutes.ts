import { Router } from 'express';
import { getHousingDetails, getHousingDetail, createHousingDetail, updateHousingDetail, deleteHousingDetail } from '../controllers/housingController';
import { authenticateJWT } from '../middleware/authMiddleware';
// import { requireRole } from '../middleware/rbacMiddleware'; // Add as needed

const router = Router();

router.use(authenticateJWT);
// TODO: Add requireRole and geographic restriction middleware as needed

router.get('/', async (req, res) => {
  try {
    res.json({ success: true, message: 'Housing details endpoint - to be implemented' });
  } catch (error) {
    console.error('❌ Get housing details error:', error);
    res.status(500).json({ error: 'Failed to fetch housing details' });
  }
});

router.get('/:id', getHousingDetail);
router.post('/', createHousingDetail);
router.put('/:id', updateHousingDetail);
router.delete('/:id', deleteHousingDetail);

export default router; 