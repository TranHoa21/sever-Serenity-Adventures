import express from 'express';
import * as controllers from '../controllers'
import { Router } from 'express';

const router = Router();
router.use(express.json());

router.post('/create-order', controllers.createOrderController);

export default router;