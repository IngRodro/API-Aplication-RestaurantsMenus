import express from 'express';
import restaurantRoutes from './restaurant/restaurant.route';

const router = express.Router();

router.use('/restaurants', restaurantRoutes);

export default router;
