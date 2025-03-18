import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./HungryAi.css";

const HungryAi = ({ isOpen, onClose }) => {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const chatContainerRef = useRef(null);

    const url = import.meta.env.VITE_RENDER_URI; // ✅ Use environment variable

    // Toggle Fullscreen Mode
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        if (!url) {
            console.error("API URL is not defined. Check your .env file.");
            return;
        }

        const userMessage = { sender: "user", text: inputText };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post(`${url}/api/ai/ai`, { prompt: inputText });
            const aiResponse = { sender: "ai", text: response.data.message };

            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            console.error("AI response error:", error);
            setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, I couldn't process that." }]);
        }

        setInputText("");
    };

    useEffect(() => {
        // Scroll chat to the latest message
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            {isOpen && (
                <div className="hungry-ai-overlay">
                    <div className={`hungry-ai-popup ${isFullscreen ? "fullscreen" : ""}`}>
                        {/* Fullscreen & Close Buttons */}
                        <div className="header-controls">
                            <button className="fullscreen-btn" onClick={toggleFullscreen}>
                                {isFullscreen ? "-" : "⛶"}
                            </button>
                            <button className="close-btn" onClick={onClose}>×</button>
                        </div>

                        {/* ✅ Chat Title */}
                        <h2 className="hungry-ai-title">Hungry AI Assistant</h2>

                        {/* ✅ Chat Messages Section (Now Scrollable) */}
                        <div className="chat-container" ref={chatContainerRef}>
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    <span>{msg.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* ✅ Input Field & Send Button */}
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Ask Hungry AI..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button className="send-btn" onClick={handleSend}>➤</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HungryAi;
