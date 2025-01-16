import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface FlightSearchState {
  source: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  numPassengers: number;
  travelClass: string;
}

const AirCard: React.FC = () => {
  const location = useLocation();
  const state = location.state as FlightSearchState;

  if (!state) {
    return <div>Error: Missing search criteria. Please start your search again.</div>;
  }

  const { source, destination, departureDate, returnDate, numPassengers, travelClass } = state;

  const [planes, setPlanes] = useState<any[]>([]);
  const [filteredPlanes, setFilteredPlanes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [sortByPrice, setSortByPrice] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!source || !destination) {
      setError("Source and Destination airports are required.");
      setIsLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/flights/search`, {
        params: {
          source,
          destination,
          departureDate,
          returnDate,
          numPassengers,
          travelClass,
        },
      })
      .then((response) => {
        setPlanes(response.data);
        setFilteredPlanes(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching plane data. Please try again later.");
        setIsLoading(false);
      });
  }, [source, destination, departureDate, returnDate, numPassengers, travelClass]);

  const handleSortByPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortByPrice(e.target.checked);
  };

  const handleAirlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedAirlines((prev) =>
      checked ? [...prev, value] : prev.filter((airline) => airline !== value)
    );
  };

  const applyFilters = () => {
    let filtered = planes.filter((plane) => {
      const matchesAirline =
        selectedAirlines.length > 0 ? selectedAirlines.includes(plane.airline) : true;
      return matchesAirline;
    });

    if (sortByPrice) {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredPlanes(filtered);
  };

  const handleBookNow = (plane: any) => {
    const { source, destination, departure, arrival, price, flightName, image, description, flightClass, flightId } = plane;

    const bookingDetails = {
      source,
      destination,
      departure,
      arrival,
      price,
      flightName,
      image,
      description,
      flightClass,
      flightId,
    };
    navigate("/AirDetails", { state: bookingDetails });
  };

  if (isLoading) return <div>Loading planes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "1200px", margin: "auto", display: "flex", gap: "2rem" }}>
        {/* Filters Section */}
        <div
          style={{
            flex: "1 0 300px",
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            height: "fit-content",
            position: "sticky",
            top: "100px",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          <h4 style={{ marginBottom: "1rem", fontWeight: "bold", color: "#333" }}>Filters</h4>
          <div style={{ marginBottom: "1.5rem" }}>
            <h5 style={{ marginBottom: "0.5rem", color: "#555" }}>Airlines</h5>
            {["Vistara", "SpiceJet", "Indigo", "5-Star"].map((airline) => (
              <div key={airline} style={{ marginBottom: "0.5rem" }}>
                <input
                  type="checkbox"
                  id={airline}
                  value={airline}
                  onChange={handleAirlineChange}
                  style={{ marginRight: "0.5rem" }}
                />
                <label htmlFor={airline} style={{ color: "#666" }}>
                  {airline}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h5 style={{ marginBottom: "0.5rem", color: "#555" }}>Sort by</h5>
            <div style={{ marginBottom: "0.5rem" }}>
              <input
                type="checkbox"
                id="sortByPrice"
                checked={sortByPrice}
                onChange={handleSortByPriceChange}
                style={{ marginRight: "0.5rem" }}
              />
              <label htmlFor="sortByPrice" style={{ color: "#666" }}>
                Price
              </label>
            </div>
          </div>
          <button
            onClick={applyFilters}
            style={{
              marginTop: "1rem",
              backgroundColor: "#007BFF",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Apply Filters
          </button>
        </div>

        {/* Planes List */}
        <div
          style={{
            flex: "3",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center",
          }}
        >
          {filteredPlanes.map((plane, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "300px",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  plane.image ||
                  "https://img.freepik.com/free-photo/planes-wing-cuts-through-sky-cotton-candy-clouds-radiant-sunset_91128-4456.jpg"
                }
                alt={plane.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>{plane.flightName}</h3>
                <p style={{ marginBottom: "0.5rem", color: "#555" }}>
                  <strong>Airline:</strong> {plane.airline}
                </p>
                <p style={{ marginBottom: "0.5rem", color: "#555" }}>
                  <strong>Departure:</strong> {new Date(plane.departure).toLocaleString()}
                </p>
                <p style={{ marginBottom: "0.5rem", color: "#555" }}>
                  <strong>Arrival:</strong> {new Date(plane.arrival).toLocaleString()}
                </p>
                <p style={{ marginBottom: "1rem", color: "#555" }}>
                  <strong>Flight Class:</strong> {plane.flightClass}
                </p>
                <p style={{ marginBottom: "1rem", color: "#555" }}>
                  <strong>Description:</strong> {plane.description || "No description available."}
                </p>
                <p style={{ marginBottom: "1rem", color: "#555" }}>
                  <strong>Price:</strong> ₹{plane.price}
                </p>
                <button
                  onClick={() => handleBookNow(plane)}
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirCard;
