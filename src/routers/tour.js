import { Router } from 'express';
import express from 'express';

import uploadCloud from '../middleware/cloudinary.js'

import * as controllers from '../controllers'


const router = Router();

router.use(express.json());

router.post('/', uploadCloud.single('file'), controllers.createTour);
router.get('/', controllers.allTour)
router.get('/:tourLink', controllers.getTourByLink);
router.put('/:tourLink', uploadCloud.single('file'), controllers.updateTour);
router.delete('/:tourId', controllers.deleteTour);





export default router;