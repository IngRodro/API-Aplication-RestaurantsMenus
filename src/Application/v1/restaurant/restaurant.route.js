import express from 'express';
import fileUpload from 'express-fileupload';
import { getAllRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from './restaurant.controller';

const router = express.Router();

router.get('/', getAllRestaurant);
router.post('/', fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads',
}), createRestaurant);
router.post('/', updateRestaurant);
router.post('/:idRestaurant', deleteRestaurant);

export default router;
