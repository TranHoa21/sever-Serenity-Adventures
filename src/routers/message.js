import express from "express";
import * as controllers from '../controllers';
import protectRoute from "../middleware/protectRoute"

const router = express.Router();

router.get("/:id", protectRoute, controllers.getMessages);
router.post("/send/:id", protectRoute, controllers.sendMessage);
router.get("/:id", protectRoute, controllers.getAllChatByUser);
router.get("/", protectRoute, controllers.updateMessage);

export default router;