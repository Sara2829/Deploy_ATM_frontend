import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const API_URL = import.meta.env.VITE_APP_API_URL;

const PaymentConfirmation: React.FC = () => {
  const location = useLocation();
  const { bookingId, totalAmount, paymentStatus: initialPaymentStatus, paymentId } = location.state as {
    bookingId: string;
    totalAmount: number;
    paymentStatus: string;
    paymentId: string;
  };

  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);

  useEffect(() => {
    const processPaymentStatus = async () => {
      if (paymentId) {
        try {
          // Update the payment status to SUCCESS on the backend
          const response = await axios.put(
            `${API_URL}/payments/${paymentId}`, // API endpoint to confirm payment
            {
              amount: totalAmount,
              status: 'SUCCESS',
              bookingId: bookingId,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log("Payment confirmed:", response.data);

          // Update the payment status based on the API response
          setPaymentStatus(response.data.status || 'UNKNOWN');
          alert("Payment confirmed! Your booking is now completed.");
        } catch (error) {
          console.error("Error confirming payment:", error);
          alert("Failed to confirm payment. Please try again.");
        }
      }
    };

    processPaymentStatus();
  }, [bookingId, totalAmount, paymentId]);

  // Function to generate and download the payment receipt
  const generateReceipt = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(20);
    doc.text('Payment Receipt', 20, 20);

    // Add Payment Details
    doc.setFontSize(14);
    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.text(`Payment Status: ${paymentStatus}`, 20, 50);
    doc.text(`Total Amount: ₹${totalAmount}`, 20, 60);
    doc.text(`Payment ID: ${paymentId}`, 20, 70);

    // Add a footer
    doc.setFontSize(10);
    doc.text('Thank you for your payment!', 20, 150);

    // Save the PDF as 'payment_receipt.pdf'
    doc.save('payment_receipt.pdf');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Payment Confirmation</h3>
          <p>Booking ID: <strong>{bookingId}</strong></p>
        </div>
        <div className="card-body">
          <p><strong>Payment Status:</strong> {paymentStatus}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
          <p><strong>Payment ID:</strong> {paymentId}</p>

          {/* Optionally, you can provide a success message */}
          {paymentStatus === 'SUCCESS' ? (
            <div className="alert alert-success" role="alert">
              Your payment has been successfully processed!
            </div>
          ) : (
            <div className="alert alert-warning" role="alert">
              Your payment is being processed. Please wait.
            </div>
          )}

          {/* Button to download payment receipt */}
          <button
            className="btn btn-primary mt-3"
            onClick={generateReceipt}
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
