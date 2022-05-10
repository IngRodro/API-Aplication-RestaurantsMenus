import express from 'express';
import fileUpload from 'express-fileupload';
import {
  getRestaurantByUser,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByLocation
} from './restaurant.controller';

const router = express.Router();

router.get('/byUser', getRestaurantByUser);
router.get('/', getRestaurantByLocation);
router.post(
  '/',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  createRestaurant
);
router.put(
  '/:idRestaurant',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  updateRestaurant
);
router.delete('/:idRestaurant', deleteRestaurant);
export default router;
