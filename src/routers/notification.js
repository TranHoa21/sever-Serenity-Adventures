

import express from "express";
import * as controllers from '../controllers';

const router = express.Router();


router.post('/', controllers.createNotification);
router.put('/:id', controllers.updateNotification);
router.get('/', controllers.getAllNotification);
router.get('/:id', controllers.getNotificationById);

export default router;