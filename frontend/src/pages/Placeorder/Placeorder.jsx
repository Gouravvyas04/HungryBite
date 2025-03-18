import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import LoginPopup from "../../components/LoginPopup/LoginPopup";

const Placeorder = () => {
  const { CartAmount, token, clearCart } = useContext(StoreContext); // ✅ Add clearCart
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormComplete = Object.values(formData).every(
    (field) => field.trim() !== ""
  );

  const orderPlaced = (e) => {
    e.preventDefault();

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    if (!isFormComplete) return;

    setShowPopup(true);
    setIsOrderPlaced(true);

    // ✅ Clear cart when order is placed
    clearCart();

    setTimeout(() => {
      setShowPopup(false);
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
          </div>
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleInputChange} />
          <div className="multi-fields">
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} />
          </div>
          <div className="multi-fields">
            <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleInputChange} />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} />
          </div>
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
        </div>

        <div className="place-order-right"></div>

        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{CartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{CartAmount() === 0 ? 0 : 30}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{CartAmount() === 0 ? 0 : CartAmount() + 30}</b>
            </div>
          </div>
          <button
            onClick={orderPlaced}
            className={(!isFormComplete || isOrderPlaced) ? "disabled-btn" : ""}
          >
            {isOrderPlaced ? "ORDER PLACED" : "PROCEED TO PAYMENT"}
          </button>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Order Placed Successfully!</h2>
              <p>Your order will be delivered shortly.</p>
            </div>
          </div>
        )}
      </form>

      {showLoginPopup && <LoginPopup setshowLogin={setShowLoginPopup} />}
    </>
  );
};

export default Placeorder;
