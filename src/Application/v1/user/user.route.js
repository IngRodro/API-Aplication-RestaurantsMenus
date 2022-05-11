import express from 'express';
import { createUser, loginUser, updateUser } from './user.controller';

const router = express.Router();

router.get('/login', loginUser);
router.post('/', createUser);
router.put('/:idUser', updateUser);

export default router;
