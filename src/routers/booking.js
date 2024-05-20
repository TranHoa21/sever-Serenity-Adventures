import { Router } from 'express';
import express from 'express';


import * as controllers from '../controllers'


const router = Router();

router.use(express.json());

router.post('/', controllers.createNewBooking);
router.get('/', controllers.getAllBooking);
router.get('/:id', controllers.getBookingById);
router.get('/:id', controllers.getBookingByUserId);
router.put('/:id', controllers.updateBooking);
router.delete('/:id', controllers.deleteBooking);



export default router;