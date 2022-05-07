import express from 'express';
import restaurantRoutes from './restaurant/restaurant.route';
import productRoutes from './product/product.route';
import menuRoutes from './menu/menu.route';
import userRoutes from './user/user.route';

const router = express.Router();

router.use('/restaurants', restaurantRoutes);
router.use('/products', productRoutes);
router.use('/menu', menuRoutes);
router.use('/users', userRoutes);

export default router;
