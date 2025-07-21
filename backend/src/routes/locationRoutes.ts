import { Router } from 'express';
import {
  getDistricts,
  createDistrict,
  getBlocks,
  createBlock,
  getPanchayats,
  createPanchayat,
  getHamlets,
  createHamlet,
} from '../controllers/locationController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/rbacMiddleware';

const router = Router();

router.use(authenticateJWT);
router.use(requireRole([1])); // Only admin can manage locations

// District
router.get('/districts', getDistricts);
router.post('/districts', createDistrict);
// Block
router.get('/blocks', getBlocks);
router.post('/blocks', createBlock);
// Panchayat
router.get('/panchayats', getPanchayats);
router.post('/panchayats', createPanchayat);
// Hamlet
router.get('/hamlets', getHamlets);
router.post('/hamlets', createHamlet);

export default router;
