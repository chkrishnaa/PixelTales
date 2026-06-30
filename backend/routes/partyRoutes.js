import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
  createParty,
  getParty,
  getPartyState,
  joinParty,
  getPendingRequests,
  respondToRequest,
  getMyStatus,
  getMyParties,
} from '../controllers/partyController.js';

const router = express.Router();

router.get('/my',                          protect,  getMyParties);
router.post('/',                           protect,  createParty);
router.get('/:code',                                 getParty);
router.get('/:code/state',                           getPartyState);
router.post('/:code/join',                 protect,  joinParty);
router.get('/:code/requests',              protect,  getPendingRequests);
router.post('/:code/respond',              protect,  respondToRequest);
router.get('/:code/my-status',             protect,  getMyStatus);

export default router;
