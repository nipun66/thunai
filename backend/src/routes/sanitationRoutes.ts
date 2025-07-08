import { Router } from 'express';
import { getSanitationDetails, getSanitationDetail, createSanitationDetail, updateSanitationDetail, deleteSanitationDetail } from '../controllers/sanitationController';
import { authenticateJWT } from '../middleware/authMiddleware';
// import { requireRole } from '../middleware/rbacMiddleware'; // Add as needed

const router = Router();

router.use(authenticateJWT);
// TODO: Add requireRole and geographic restriction middleware as needed

router.get('/', getSanitationDetails);
router.get('/:id', getSanitationDetail);
router.post('/', createSanitationDetail);
router.put('/:id', updateSanitationDetail);
router.delete('/:id', deleteSanitationDetail);

export default router; 