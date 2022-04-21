import express from 'express';
import restaurantRoutes from './restaurant/restaurant.route';
import productRoutes from './product/product.route';

const router = express.Router();

router.use('/restaurants', restaurantRoutes);
router.use('products', productRoutes);

export default router;
