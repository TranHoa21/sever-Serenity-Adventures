import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers'


const router = Router();

router.use(express.json());

router.get('/', controllers.paginatedPosts);







export default router;