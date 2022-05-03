import express from 'express';
import {
  getMenu, createMenu, updateMenu, deleteProduct
} from './menu.controller';

const router = express.Router();

router.get('/:idRestaurant', getMenu);
router.post('/', createMenu);
router.put('/:idMenu', updateMenu);
router.delete('/:idMenu', deleteProduct);

export default router;
