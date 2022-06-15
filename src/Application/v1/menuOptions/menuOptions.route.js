import express from 'express';
import { TokenValidation } from 'Utils/Authentication';
import {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from './menuOptions.controller';

const router = express.Router();

router.get('/:idRestaurant', TokenValidation, getMenu);
router.post('/', TokenValidation, createMenu);
router.get('/show/:idRestaurant', getMenu);
router.put('/:idMenu', TokenValidation, updateMenu);
router.delete('/:idMenu', TokenValidation, deleteMenu);

export default router;
