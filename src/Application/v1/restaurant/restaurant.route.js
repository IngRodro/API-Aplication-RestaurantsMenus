import express from 'express';
import fileUpload from 'express-fileupload';
import {
  getAllRestaurant, createRestaurant, updateRestaurant, deleteRestaurant
} from './restaurant.controller';

const router = express.Router();

router.get('/', getAllRestaurant);
router.post('/', fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads',
}), createRestaurant);
router.put('/:idRestaurant', fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads',
}), updateRestaurant);
router.delete('/:idRestaurant', deleteRestaurant);
export default router;
