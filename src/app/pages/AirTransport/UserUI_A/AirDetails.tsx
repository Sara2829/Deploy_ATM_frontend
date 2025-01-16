import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const AirDetailsPage: React.FC = () => {
  const location = useLocation();
  const flightDetails = location.state as {
    name: string;
    image: string;
    description: string;
    price: number;
    source: string;
    destination: string;
    flightId: string;
    gallery: string[];
  };

  const [travellerCount, settravellerCount] = useState<number>(1);
  const navigate = useNavigate();

  const handleNavigateToPassengerEntry = async () => {
    console.log("Flight ID:", flightDetails.flightId);
    console.log("Number of Travelers:", travellerCount);
    try {
      // Call backend API to create a booking
      const response = await axios.post(`${API_URL}/bookings`, {
        flightId: flightDetails.flightId,
        travellerCount,
      });

      // Log the full backend response for debugging
      console.log("Booking Response:", response.data);

      // Extract booking ID from the response
      const bookingId = response.data.bookingId || response.data.id; // Adjust based on backend response
      if (!bookingId) {
        throw new Error("Booking ID not returned from backend.");
      }

      console.log("Generated Booking ID:", bookingId);

      // Store booking ID and flight details in local storage
      localStorage.setItem("bookingId", bookingId);
      localStorage.setItem("flightDetails", JSON.stringify(flightDetails));

      // Navigate to Passenger Entry page with flight details, travelers, and booking ID
      navigate("/AirDetails/passengerEntry", {
        state: { flightDetails, travellerCount, bookingId },
      });
    } catch (error: any) {
      // Log error details
      if (error.response) {
        console.error("API Error Response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Airline Details</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={
                  flightDetails.image ||
                  "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg"
                }
                alt={flightDetails.name}
                className="img-fluid rounded-start"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h5>{flightDetails.name}</h5>
              <p>{flightDetails.description}</p>
              <p>
                <strong>Price: ₹{flightDetails.price}</strong>
              </p>
              <p>
                <strong>Source:</strong> {flightDetails.source}
              </p>
              <p>
                <strong>Destination:</strong> {flightDetails.destination}
              </p>

              <div className="mb-3">
                <label>Number of Travelers</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={travellerCount}
                  onChange={(e) => settravellerCount(Number(e.target.value))}
                />
              </div>

              <button
                className="btn btn-primary float-end"
                onClick={handleNavigateToPassengerEntry}
              >
                Proceed to Passenger Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirDetailsPage;