import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AirHomePage: React.FC = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [numPassengers, setNumPassengers] = useState("");
  const [travelClass, setTravelClass] = useState("economy");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Log the search parameters to the console
    console.log("Search Parameters:", {
      source,
      destination,
      departureDate,
      returnDate,
      numPassengers,
      travelClass,
    });

    // Pass search parameters to AirCard page
    navigate("/Air/Search", {
      state: {
        source,
        destination,
        departureDate,
        returnDate,
        numPassengers,
        travelClass,
      },
    });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h1> This is Air user HomePage</h1>
          <h3 className="card-title">Air Travel Booking Form</h3>
        </div>
        <div className="card-body">
          <div className="row align-items-end">
            {/* Source Airport */}
            <div className="col-md-2">
              <label htmlFor="source" className="form-label">
                Source Airport
              </label>
              <input
                type="text"
                id="source"
                className="form-control"
                placeholder="Enter Source Airport"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>

            {/* Destination Airport */}
            <div className="col-md-2">
              <label htmlFor="destination" className="form-label">
                Destination Airport
              </label>
              <input
                type="text"
                id="destination"
                className="form-control"
                placeholder="Enter Destination Airport"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Departure Date */}
            <div className="col-md-2">
              <label htmlFor="departureDate" className="form-label">
                Departure Date
              </label>
              <input
                type="date"
                id="departureDate"
                className="form-control"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>

            {/* Return Date */}
            <div className="col-md-2">
              <label htmlFor="returnDate" className="form-label">
                Return Date (Optional)
              </label>
              <input
                type="date"
                id="returnDate"
                className="form-control"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            {/* Number of Passengers */}
            <div className="col-md-2">
              <label htmlFor="numPassengers" className="form-label">
                Passengers
              </label>
              <input
                type="number"
                id="numPassengers"
                className="form-control"
                value={numPassengers}
                onChange={(e) => setNumPassengers(e.target.value)}
              />
            </div>

            {/* Travel Class */}
            <div className="col-md-2">
              <label htmlFor="travelClass" className="form-label">
                Travel Class
              </label>
              <select
                id="travelClass"
                className="form-select"
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="firstClass">First Class</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-md-12 mt-12 d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirHomePage;
