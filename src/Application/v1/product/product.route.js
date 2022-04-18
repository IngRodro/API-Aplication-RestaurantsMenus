import express from 'express';
import { getAllProduct, createProduct } from './product.controller';

const router = express.Router();

router.get('/', getAllProduct);
router.post('/', createProduct);

export default router;
