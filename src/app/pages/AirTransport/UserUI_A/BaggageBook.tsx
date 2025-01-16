import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const BaggageBook: React.FC = () => {
  const location = useLocation();
  const { bookingId, passengerCount, flightDetails } = location.state as {
    bookingId: string;
    passengerCount: number; // Receiving passengerCount from previous page
    flightDetails: {
      name: string;
      image: string;
      description: string;
      price: number; // Price field is kept
      source: string;
      destination: string;
      flightId: string;
    };
  };
  const [baggageInfo, setBaggageInfo] = useState({
    weight: "",
    bagCount: "",
  });
  const navigate = useNavigate();

  const handleBaggageSubmit = async () => {
    // Validate inputs
    const { weight, bagCount } = baggageInfo;
    if (!weight || !bagCount) {
      alert("Please enter both weight and bag count.");
      return;
    }

    try {
      // Send baggage details to the backend
      const response = await axios.post(
        `${API_URL}/baggages/booking/${bookingId}`, // Use bookingId in path
        {
          weight: parseFloat(weight), // Convert to double
          bagCount: parseInt(bagCount, 10), // Convert to int
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Baggage successfully added:", response.data);
      alert("Baggage successfully added!");

       // Store baggage details in local storage
       const baggageDetails = {
        bookingId,
        weight: parseFloat(weight),
        bagCount: parseInt(bagCount, 10),
        flightDetails,
      };
      localStorage.setItem("baggageDetails", JSON.stringify(baggageDetails));

      // Navigate to the Payment page with necessary details, including price
      navigate("/payment/confirmation", {
        state: {
          bookingId,
          passengerCount, // Passing passenger count
          baggageInfo, // Pass baggage info if needed
          price: flightDetails.price, // Passing price to the next page
        },
      });
    } catch (error) {
      console.error("Error adding baggage:", error);
      alert("Failed to add baggage. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Baggage Booking</h3>
          <p>Booking ID: <strong>{bookingId}</strong></p>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              className="form-control"
              value={baggageInfo.weight}
              onChange={(e) => setBaggageInfo({ ...baggageInfo, weight: e.target.value })}
              placeholder="Enter baggage weight"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Bag Count</label>
            <input
              type="number"
              className="form-control"
              value={baggageInfo.bagCount}
              onChange={(e) => setBaggageInfo({ ...baggageInfo, bagCount: e.target.value })}
              placeholder="Enter number of bags"
            />
          </div>
          <button className="btn btn-primary" onClick={handleBaggageSubmit}>
            Submit Baggage
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaggageBook;
