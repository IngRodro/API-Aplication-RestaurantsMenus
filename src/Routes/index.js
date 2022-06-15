import express from 'express';
import v1 from 'Application/v1';
import cors from 'cors';

const corsOptions = {
  exposedHeaders: 'auth-token',
};

const router = express.Router();

router.use('/v1', cors(corsOptions), v1);

export default router;
