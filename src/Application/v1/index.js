import express from 'express';
import restaurantRoutes from './restaurant/restaurant.route';
import productRoutes from './product/product.route';
import menuRoutes from './menu/menu.route';

const router = express.Router();

router.use('/restaurants', restaurantRoutes);
router.use('/products', productRoutes);
router.use('/menu', menuRoutes);

export default router;
