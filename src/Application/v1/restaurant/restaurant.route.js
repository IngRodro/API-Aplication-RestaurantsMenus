import express from 'express';
import fileUpload from 'express-fileupload';
import {
  getRestaurantByUser,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByLocation,
} from './restaurant.controller';
import { TokenValidation } from '../../../Utils/Authentication';

const router = express.Router();

router.get('/byUser', TokenValidation, getRestaurantByUser);
router.get('/', getRestaurantByLocation);
router.post(
  '/', TokenValidation, fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }), createRestaurant
);
router.put(
  '/:idRestaurant', TokenValidation, fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }), updateRestaurant
);
router.delete('/:idRestaurant', TokenValidation, deleteRestaurant);
export default router;
