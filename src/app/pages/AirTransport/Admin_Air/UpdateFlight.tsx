import React, { useState, useEffect } from "react";

interface UpdateFlightProps {
  flight: {
    id: number;
    flightName: string;
    departure: string;
    arrival: string;
    source: string;
    destination: string;
    price: number;
    airline: string;
    flightClass: string;
  };
  onClose: () => void;
  onUpdate: (updatedFlight: any) => void;
}

const UpdateFlight: React.FC<UpdateFlightProps> = ({ flight, onClose, onUpdate }) => {
  const [updatedFlight, setUpdatedFlight] = useState(flight);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedFlight({ ...updatedFlight, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedFlight);
    onClose(); // Close the modal after updating
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Flight</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Flight Name</label>
            <input
              type="text"
              name="flightName"
              value={updatedFlight.flightName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Departure</label>
            <input
              type="datetime-local"
              name="departure"
              value={updatedFlight.departure}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Arrival</label>
            <input
              type="datetime-local"
              name="arrival"
              value={updatedFlight.arrival}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Source</label>
            <input
              type="text"
              name="source"
              value={updatedFlight.source}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              value={updatedFlight.destination}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={updatedFlight.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Airline</label>
            <input
              type="text"
              name="airline"
              value={updatedFlight.airline}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Class</label>
            <input
              type="text"
              name="flightClass"
              value={updatedFlight.flightClass}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Update Flight</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFlight;
