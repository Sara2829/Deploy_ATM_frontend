import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../Pagination";
import AddFlight from "./Addaircraft"; // Import AddFlight modal

const API_URL = import.meta.env.VITE_APP_API_URL;

export const PlansPage: React.FC = () => {
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddFlightModal, setShowAddFlightModal] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${API_URL}/flights/all`);
        setFlights(response.data);
        console.log("Flights response:", response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  console.log(flights);

  const filteredFlights = flights.filter((flight) =>
    flight.flightName.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleAddFlight = (newFlight: {
    flightName: string;
    departure: string;
    arrival: string;
    source: string;
    destination: string;
    price: number;
    airline: string;
    flightClass: string;
  }) => {
    setFlights([...flights, { ...newFlight, id: flights.length + 1 }]);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Flights</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Flights: {filteredFlights.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Flights"
            value={search}
            onChange={handleSearchChange}
          />

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddFlightModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New Flight
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Name</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Price</th>
                <th>Airline</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((flight) => (
                  <tr key={flight.id}>
                    <td>{flight.flightName}</td>
                    <td>{new Date(flight.departure).toLocaleString()}</td>
                    <td>{new Date(flight.arrival).toLocaleString()}</td>
                    <td>{flight.source}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.price}</td>
                    <td>{flight.airline}</td>
                    <td>{flight.flightClass}</td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button
                          className="btn btn-icon btn-bg-light btn-sm me-1"
                          // View button functionality
                        >
                          <i className="ki-duotone ki-eye fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          // Edit button functionality
                        >
                          <i className="ki-duotone ki-pencil fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          onClick={()=>alert("clicked")}
                          // Delete button functionality
                        >
                          <i className="ki-duotone ki-trash fs-3 text-danger">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                          </i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredFlights.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add Flight Modal */}
      {showAddFlightModal && (
        <AddFlight
          onClose={() => setShowAddFlightModal(false)}
          onAdd={handleAddFlight}
        />
      )}
    </div>
  );
};
