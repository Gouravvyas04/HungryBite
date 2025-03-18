import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        // Extract token from headers (directly without split)
        const token = req.header("Authorization");// Ensure frontend sends only token, not "Bearer token"
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again!" });
        }

        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Store user ID in req.body

        next(); // Proceed to next middleware
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
