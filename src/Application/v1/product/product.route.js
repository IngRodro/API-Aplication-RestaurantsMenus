import express from 'express';
import { getAllProduct, createProduct, updateProduct, deleteProduct } from './product.controller';

const router = express.Router();

router.get('/', getAllProduct);
router.post('/', createProduct);
router.post('/', updateProduct);
router.post('/:idProduct', deleteProduct);

export default router;
