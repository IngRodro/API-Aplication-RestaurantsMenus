import express from 'express';
import { getAllUsers, createUser, loginUser } from './user.controller';

const router = express.Router();

router.get('/login', loginUser);
router.get('/', getAllUsers);
router.post('/', createUser);
// router.put('/:idMenu', updateMenu);
// router.delete('/:idMenu', deleteProduct);

export default router;
