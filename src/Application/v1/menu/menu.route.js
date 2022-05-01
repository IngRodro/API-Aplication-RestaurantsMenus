import express from 'express';
import {
  getAllProduct, createProduct, updateProduct, deleteProduct
} from './menu.controller';

const router = express.Router();

router.get('/', getAllProduct);
router.post('/', createProduct);
router.put('/:idProduct', updateProduct);
router.delete('/:idProduct', deleteProduct);

export default router;
