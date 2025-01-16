import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, passengerCount, price } = location.state as {
    bookingId: string;
    passengerCount: number;
    price: number;
  };

  const [paymentStatus, setPaymentStatus] = useState('PENDING');
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentId, setPaymentId] = useState<string | null>(null); // Track paymentId

  useEffect(() => {
    // Calculate total amount based on passenger count and price
    const calculatedAmount = passengerCount * price;
    setTotalAmount(calculatedAmount);
  }, [passengerCount, price]);

  const handleMakePayment = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/payments`, // API endpoint for processing payment
        {
          amount: totalAmount,
          status: paymentStatus,
          bookingId: bookingId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Payment successful! Your booking is confirmed.");
      console.log("this is valid id",response.data.id); // Assume we get paymentId from the response
      // Assume we get paymentId from the response
      const receivedPaymentId = response.data.id;
       // Log the received paymentId
      setPaymentId(receivedPaymentId); // Store the paymentId

      // Navigate to the next page with the payment details
      navigate('/payment/status', {
        state: {
          bookingId,
          totalAmount,
          paymentStatus: 'PENDING', // Pass status as PENDING
          paymentId: receivedPaymentId, // Pass paymentId to the next page
        },
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Payment Details</h3>
          <p>Booking ID: <strong>{bookingId}</strong></p>
        </div>
        <div className="card-body">
          <p><strong>Payment Status:</strong> {paymentStatus}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
          
          {/* Make Payment Button */}
          <button className="btn btn-success" onClick={handleMakePayment}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
