import express from 'express';
import { getAllRestaurant, createRestaurant } from './restaurant.controller';

const router = express.Router();

router.get('/', getAllRestaurant);
router.post('/', createRestaurant);

export default router;
