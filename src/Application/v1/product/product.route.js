import express from 'express';
import { getAllProduct, createProduct, updateProduct } from './product.controller';

const router = express.Router();

router.get('/', getAllProduct);
router.post('/', createProduct);
router.post('/', updateProduct);

export default router;
