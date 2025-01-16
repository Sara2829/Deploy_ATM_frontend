import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const FilterpanelAir: React.FC<{ onFilterApply: (filteredFlights: any[]) => void }> = ({
  onFilterApply,
}) => {
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleAirlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedAirlines((prev) =>
      checked ? [...prev, value] : prev.filter((airline) => airline !== value)
    );
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedRatings((prev) =>
      checked ? [...prev, value] : prev.filter((rating) => rating !== value)
    );
  };

  const handleFilterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedAirlines.length === 0 && selectedRatings.length === 0 && minPrice === 0 && maxPrice === 0) {
      setError("Please select at least one filter.");
      return;
    }

    setError("");

    try {
      const filteredFlights: any[] = [];
      if (selectedAirlines.length > 0) {
        for (const airline of selectedAirlines) {
          const response = await axios.get(`${API_URL}/flights/airline/${airline}`);
          console.log("Response:", response.data);
          filteredFlights.push(...response.data);
        }
      }

      // Additional filtering logic for ratings and price range can be applied here
      const finalFilteredFlights = filteredFlights.filter((flight) => {
        const matchesRating = selectedRatings.length > 0
          ? selectedRatings.includes(flight.rating)
          : true;
        const matchesPrice = (minPrice === 0 || flight.price >= minPrice) &&
          (maxPrice === 0 || flight.price <= maxPrice);
        return matchesRating && matchesPrice;
      });

      onFilterApply(finalFilteredFlights);
    } catch (err) {
      setError("Error fetching filtered flights. Please try again.");
    }
  };

  // Inline CSS styles
  const styles = {
    filterPanel: {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
    },
    filterCard: {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.3s ease",
    },
    filterCardHover: {
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    },
    filterCardBody: {
      padding: "1.5rem",
    },
    sectionTitle: {
      color: "#007bff",
      fontSize: "1.25rem",
    },
    filterLabel: {
      fontWeight: "600",
      fontSize: "0.9rem",
      color: "#555",
    },
    filterInputLabel: {
      fontWeight: "600",
      fontSize: "0.8rem",
      color: "#666",
    },
    filterBtn: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "0.8rem 2rem",
      borderRadius: "30px",
      border: "none",
      transition: "background-color 0.3s ease",
    },
    filterBtnHover: {
      backgroundColor: "#0056b3",
    },
    customBudgetSection: {
      marginTop: "1rem",
      padding: "1rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    dFlex: {
      display: "flex",
      justifyContent: "space-between",
    },
    mr3: {
      marginRight: "1rem",
    },
  };

  return (
    <div className="filter-panel container mt-4" style={styles.filterPanel}>
      <div
        className="card shadow-lg p-4 filter-card"
        style={styles.filterCard}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.filterCardHover.boxShadow)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = styles.filterCard.boxShadow)}
      >
        <div className="card-header border-0 pt-5">
          <h3 className="card-title text-center font-weight-bold fs-3 mb-4">Filters</h3>
        </div>
        <div className="card-body filter-card-body" style={styles.filterCardBody}>
          <form onSubmit={handleFilterSubmit}>
            <h5 className="font-weight-bold mb-3 filter-section-title" style={styles.sectionTitle}>
              Airlines
            </h5>
            <ul className="filterList list-unstyled">
              {["Vistara", "Spice-jet", "Indigo", "5-Star"].map((airline) => (
                <li key={airline}>
                  <input
                    type="checkbox"
                    id={airline}
                    value={airline}
                    onChange={handleAirlineChange}
                  />
                  <label htmlFor={airline} className="filter-label" style={styles.filterLabel}>
                    {airline}
                  </label>
                </li>
              ))}
            </ul>

            <h5 className="font-weight-bold mb-3 filter-section-title" style={styles.sectionTitle}>
              Price Range
            </h5>
            <div className="custom-budget-section" style={styles.customBudgetSection}>
              <div className="d-flex" style={styles.dFlex}>
                <div className="d-flex flex-column mr-3" style={styles.mr3}>
                  <label className="filter-input-label" style={styles.filterInputLabel}>
                    Min:
                  </label>
                  <input
                    type="number"
                    placeholder="₹ Min"
                    className="form-control form-control-sm"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  />
                </div>
                <div className="d-flex flex-column">
                  <label className="filter-input-label" style={styles.filterInputLabel}>
                    Max:
                  </label>
                  <input
                    type="number"
                    placeholder="₹ Max"
                    className="form-control form-control-sm"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <h5 className="font-weight-bold mb-3 filter-section-title" style={styles.sectionTitle}>
              Rating
            </h5>
            <ul className="filterList list-unstyled">
              {["Very Good", "Good", "Better"].map((rating) => (
                <li key={rating}>
                  <input
                    type="checkbox"
                    id={rating}
                    value={rating}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor={rating} className="filter-label" style={styles.filterLabel}>
                    {rating}
                  </label>
                </li>
              ))}
            </ul>

            {error && <div className="text-danger text-center">{error}</div>}

            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-primary filter-btn"
                style={styles.filterBtn}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = styles.filterBtnHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = styles.filterBtn.backgroundColor)
                }
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterpanelAir;
