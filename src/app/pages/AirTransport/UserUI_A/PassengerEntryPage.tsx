import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const PassengerEntryPage: React.FC = () => {
  const location = useLocation();
  const { flightDetails, bookingId } = location.state as {
    flightDetails: {
      name: string;
      image: string;
      description: string;
      price: number;
      source: string;
      destination: string;
      flightId: string;
    };
    bookingId: string; // Booking ID received here
  };

  const [passengerInfo, setPassengerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [passengers, setPassengers] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleAddPassenger = () => {
    // Add passenger to the local array
    if (!passengerInfo.name || !passengerInfo.email || !passengerInfo.phone) {
      alert("Please fill in all fields for the passenger.");
      return;
    }

    setPassengers([...passengers, { ...passengerInfo }]);
    setPassengerInfo({ name: "", email: "", phone: "" });
  };

  const handleSubmitPassengers = async () => {
    try {
      // Send passengers array to the backend
      const response = await axios.post(
        `${API_URL}/passengers/add/${bookingId}`,
        passengers,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Passengers successfully added:", response.data);
      alert("Passengers successfully registered!");

      // Navigate to the summary page with relevant details
      navigate("/AirDetails/baggage", {
        state: {
          flightDetails,
          passengers,
          bookingId,
          passengerCount: passengers.length, // Passing passenger count
        },
      });
    } catch (error) {
      console.error("Error submitting passengers:", error);
      alert("Failed to submit passengers. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Passenger Entry</h3>
          <p>
            Flight: <strong>{flightDetails.name}</strong> | From:{" "}
            <strong>{flightDetails.source}</strong> To:{" "}
            <strong>{flightDetails.destination}</strong>
          </p>
        </div>
        <div className="card-body">
          {/* Passenger Form */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={passengerInfo.name}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, name: e.target.value })}
              placeholder="Enter passenger's name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={passengerInfo.email}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
              placeholder="Enter passenger's email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={passengerInfo.phone}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, phone: e.target.value })}
              placeholder="Enter passenger's phone number"
            />
          </div>

          {/* Add Passenger Button */}
          <button className="btn btn-success me-2" onClick={handleAddPassenger}>
            Add Passenger
          </button>

          {/* Submit Passengers Button */}
          <button
            className="btn btn-primary"
            onClick={handleSubmitPassengers}
            disabled={passengers.length === 0}
          >
            Submit Passengers
          </button>

          {/* Passenger List */}
          <div className="mt-4">
            <h5>Passengers Added:</h5>
            {passengers.length > 0 ? (
              <ul className="list-group">
                {passengers.map((passenger, index) => (
                  <li key={index} className="list-group-item">
                    {index + 1}. {passenger.name} - {passenger.email} -{" "}
                    {passenger.phone}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No passengers added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerEntryPage;
