import React from "react";
import { useNavigate } from "react-router-dom";

const BusBooking = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/BusSearch");
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h1> This is Ground User Homepage</h1>
          <h3 className="card-title">Bus Booking Form</h3>
        </div>
        <div className="card-body">
          <div className="row align-items-end">
            {/* Source */}
            <div className="col-md-2">
              <label htmlFor="source" className="form-label">
                Source
              </label>
              <input
                type="text"
                id="source"
                className="form-control"
                placeholder="Enter Source"
              />
            </div>

            {/* Destination */}
            <div className="col-md-2">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                className="form-control"
                placeholder="Enter Destination"
              />
            </div>

            {/* Date From */}
            <div className="col-md-2">
              <label htmlFor="dateFrom" className="form-label">
                Date From
              </label>
              <input type="date" id="dateFrom" className="form-control" />
            </div>

            {/* Date To */}
            <div className="col-md-2">
              <label htmlFor="dateTo" className="form-label">
                Date To
              </label>
              <input type="date" id="dateTo" className="form-control" />
            </div>

            {/* Number of Travelers */}
            <div className="col-md-2">
              <label htmlFor="numTravelers" className="form-label">
                Travelers
              </label>
              <input
                type="number"
                id="numTravelers"
                className="form-control"
                placeholder="Travelers"
              />
            </div>

            {/* Bus Type */}
            <div className="col-md-2">
              <label htmlFor="busType" className="form-label">
                Bus Type
              </label>
              <select id="busType" className="form-select">
                <option value="standard">Standard</option>
                <option value="luxury">Luxury</option>
                <option value="express">Express</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-md-12 mt-12 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/Ground/Search")}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="card mt-4">
          <h1> Special Discounts for You</h1>
          <div className="row">
            {/* First Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-danger px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                  10% off on Bus Booking
                </a>
              </div>
            </div>

            {/* Second Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-danger px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                  15% off for Early Bookings
                </a>
              </div>
            </div>

            {/* Third Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-danger px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                  20% off on Round Trips
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;
