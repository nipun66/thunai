import { Router } from 'express';
import { getLandAssets, getLandAsset, createLandAsset, updateLandAsset, deleteLandAsset } from '../controllers/landAssetController';
import { authenticateJWT } from '../middleware/authMiddleware';
// import { requireRole } from '../middleware/rbacMiddleware'; // Add as needed

const router = Router();

router.use(authenticateJWT);
// TODO: Add requireRole and geographic restriction middleware as needed

router.get('/', async (req, res) => {
  try {
    res.json({ success: true, message: 'Land assets endpoint - to be implemented' });
  } catch (error) {
    console.error('❌ Get land assets error:', error);
    res.status(500).json({ error: 'Failed to fetch land assets' });
  }
});

router.get('/:id', getLandAsset);
router.post('/', createLandAsset);
router.put('/:id', updateLandAsset);
router.delete('/:id', deleteLandAsset);

export default router; 