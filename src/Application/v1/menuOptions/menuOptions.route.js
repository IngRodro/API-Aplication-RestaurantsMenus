import express from 'express';
import {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from './menuOptions.controller';

const router = express.Router();

router.get('/:idRestaurant', getMenu);
router.post('/', createMenu);
router.put('/:idMenu', updateMenu);
router.delete('/:idMenu', deleteMenu);

export default router;
