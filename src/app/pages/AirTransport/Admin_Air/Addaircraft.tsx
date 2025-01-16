import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface AddFlightProps {
  onClose: () => void;
  onAdd: (flight: Flight) => void;
}

interface Flight {
  flightName: string;
  departure: string;
  arrival: string;
  source: string;
  destination: string;
  price: number;
  airline: string;
  flightClass: string;
  adminId: number; // You can set this statically if needed
}

const AddFlight: React.FC<AddFlightProps> = ({ onClose, onAdd }) => {
  const [newFlight, setNewFlight] = useState<Flight>({
    flightName: "",
    departure: "",
    arrival: "",
    source: "",
    destination: "",
    price: 0,
    airline: "",
    flightClass: "Economy", // Default value
    adminId: 1, // Assuming this is hardcoded for now
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewFlight({ ...newFlight, [name]: value });
  };

  const handleAddFlight = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send the new flight data to the API
    try {
      const response = await axios.post(`${API_URL}/flights/schedule`, newFlight);
      console.log("Flight added:", response.data);
      onAdd(newFlight); // Optionally call onAdd to update the UI with the new flight
      onClose(); // Close the modal after adding the flight
    } catch (error) {
      console.error("Error adding flight:", error);
    }
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Flight</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddFlight}>
              <div className="mb-3">
                <label className="form-label">Flight Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="flightName"
                  value={newFlight.flightName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Departure</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="departure"
                  value={newFlight.departure}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Arrival</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="arrival"
                  value={newFlight.arrival}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Source</label>
                <input
                  type="text"
                  className="form-control"
                  name="source"
                  value={newFlight.source}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Destination</label>
                <input
                  type="text"
                  className="form-control"
                  name="destination"
                  value={newFlight.destination}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={newFlight.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Airline</label>
                <input
                  type="text"
                  className="form-control"
                  name="airline"
                  value={newFlight.airline}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Flight Class</label>
                <select
                  className="form-select"
                  name="flightClass"
                  value={newFlight.flightClass}
                  onChange={handleInputChange}
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Add Flight
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFlight;
