import express from "express";
import { generateAIResponse } from "../controllers/aiController.js"; // ✅ Correct import

const router = express.Router();

// Define AI response route
router.post("/ai", async (req, res) => {
    try {
        const { prompt } = req.body; // ✅ Fix the way 'prompt' is extracted

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await generateAIResponse(prompt);
        res.json({ success: true, message: response });
    } catch (error) {
        console.error("AI Route Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
