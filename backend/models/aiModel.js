import express from "express";
import { addMessage, getChatHistory, clearChatHistory } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ai", addMessage);
router.get("/history/:userId", getChatHistory);
router.delete("/clear", clearChatHistory);

export default router;
    