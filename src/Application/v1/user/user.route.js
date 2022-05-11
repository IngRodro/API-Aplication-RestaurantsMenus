import express from 'express';
import { createUser, loginUser, updateUser } from './user.controller';
import { TokenValidation } from '../../../Utils/Authentication';

const router = express.Router();

router.get('/login', loginUser);
router.post('/', createUser);
router.put('/', TokenValidation, updateUser);

export default router;
