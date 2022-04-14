import express from 'express';
import { getAllRestaurant, createExample } from './restaurant.controller';

const router = express.Router();

router.get('/', getAllRestaurant);
router.post('/', createExample);

export default router;
