import React from 'react';
import { useCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';


function Payment({ user }) {
  const cartItems = useCart();
  const navigate = useNavigate();

  const handlePaymentOption = async (option) => {
    const confirmation = window.confirm(`You selected: ${option}. Confirm order?`);
    if (confirmation) {
      try {
        const orderDetails = {
          userId: user.id, // Ensure user info is passed as props or fetched from context
          name: user.name,
          email: user.email,
          phone: user.phone,
          items: cartItems,
          total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
          paymentMethod: option,
          orderTime: new Date().toISOString()
        };

        const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderDetails)
        });

        if (response.ok) {
          alert('Order placed successfully!');
          navigate('/'); // Redirect to home or order success page
        } else {
          alert('Failed to place the order.');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3>Choose Payment Option</h3>
      <button className="btn btn-outline-primary mt-3" onClick={() => handlePaymentOption('Cash on Delivery')}>
        Cash on Delivery
      </button>
      <button className="btn btn-outline-primary mt-3 ms-3" onClick={() => handlePaymentOption('UPI')}>
        UPI
      </button>
    </div>
  );
}

export default Payment;
