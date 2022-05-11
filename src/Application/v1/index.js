import express from 'express';
import { TokenValidation } from 'Utils/Authentication';
import restaurantRoutes from './restaurant/restaurant.route';
import productRoutes from './product/product.route';
import menuRoutes from './menuOptions/menuOptions.route';
import userRoutes from './user/user.route';

const router = express.Router();

router.use('/restaurants', restaurantRoutes);
router.use('/products', TokenValidation, productRoutes);
router.use('/menu', TokenValidation, menuRoutes);
router.use('/users', userRoutes);

export default router;
