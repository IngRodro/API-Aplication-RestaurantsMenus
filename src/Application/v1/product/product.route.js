import express from 'express';
import fileUpload from 'express-fileupload';
import {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.controller';

const router = express.Router();

router.get('/:idRestaurant', getAllProduct);
router.post(
  '/',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  createProduct
);
router.put(
  '/:idProduct',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  updateProduct
);
router.delete('/:idProduct', deleteProduct);

export default router;
