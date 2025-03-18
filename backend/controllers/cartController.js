import userModel from "../models/userModel.js";

// Add items to cart
const addToCart = async (req, res) => {
    try {
        
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemid]){
            cartData[req.body.itemid] =  1;
        }
        else{
            cartData[req.body.itemid] +=  1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if (cartData[req.body.itemid]>0) {
            cartData[req.body.itemid] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData});
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };
