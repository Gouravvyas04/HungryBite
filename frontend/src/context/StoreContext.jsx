import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodlist] = useState([]);
    const [chatMessages, setChatMessages] = useState([]); // ✅ AI Chat State
    const [token, setToken] = useState("");

    const url = import.meta.env.VITE_RENDER_URI; // ✅ Use environment variable for API URL

    const login = async (email, password) => {
        try {
            if (!url) {
                console.error("API URL is not defined. Check your .env file.");
                return;
            }

            const response = await axios.post(`${url}/api/auth/login`, { email, password });
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user._id);
                setToken(response.data.token);
            } else {
                console.error("Login failed:", response.data.message);
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error);
        }
    };

    const addtoCart = async (itemid) => {
        setCartItems((prev) => ({
            ...prev,
            [itemid]: (prev[itemid] || 0) + 1,
        }));

        if (token && url) {
            await axios.post(`${url}/api/cart/add`, { itemid }, { headers: { Authorization: token } });
        }
    };

    const removefromCart = async (itemid) => {
        setCartItems((prev) => ({
            ...prev,
            [itemid]: prev[itemid] > 1 ? prev[itemid] - 1 : 0,
        }));

        if (token && url) {
            await axios.post(`${url}/api/cart/remove`, { itemid }, { headers: { Authorization: token } });
        }
    };

    const CartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodlist = async () => {
        try {
            if (!url) {
                console.error("API URL is not defined. Check your .env file.");
                return;
            }

            const response = await axios.get(`${url}/api/food/list`);
            setFoodlist(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            if (!url) {
                console.error("API URL is not defined. Check your .env file.");
                return;
            }

            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { Authorization: token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const clearCart = () => {
        setCartItems({});
        localStorage.removeItem("cart");
    };

    const sendMessageToAI = async (userMessage) => {
        try {
            if (!url) {
                console.error("API URL is not defined. Check your .env file.");
                return;
            }

            // ✅ Update UI immediately with user's message
            setChatMessages((prev) => [...prev, { sender: "user", text: userMessage }]);

            const response = await axios.post(`${url}/api/ai/ai`, { prompt: userMessage });

            if (response.data.success) {
                setChatMessages((prev) => [...prev, { sender: "ai", text: response.data.message }]);
            } else {
                console.error("AI response error:", response.data.message);
            }
        } catch (error) {
            console.error("AI chat request failed:", error.response?.data || error);
        }
    };

    useEffect(() => {
        async function loadData() {
            if (!url) {
                console.error("API URL is not defined. Check your .env file.");
                return;
            }

            await fetchFoodlist();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, [url]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addtoCart,
        removefromCart,
        CartAmount,
        url,
        login,
        token,
        setToken,
        clearCart,
        chatMessages, // ✅ Expose AI chat messages
        sendMessageToAI, // ✅ Expose AI chat function
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
