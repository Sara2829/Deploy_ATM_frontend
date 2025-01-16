import React, { useState } from "react";

const FilterPanelGround: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the filter logic
  };

  return (
    <div className="filter-panel container mt-4">
      <div className="card shadow-sm p-3">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Filters</span>
          </h3>
        </div>
        <div
          className="card-body"
          style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
        >
          <form onSubmit={handleFilterSubmit}>
            <h5 className="font-weight-bold mb-3 card-label fs-3">Rides</h5>
            <ul className="filterList list-unstyled">
              <li>
                <input
                  type="checkbox"
                  id="vistara"
                  aria-label="vistara"
                  value="vistara"
                />
                <label
                  htmlFor="vistara"
                  className="fw-semibold fs-7 text-muted"
                >
                  Mini Car
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="Spice-jet"
                  aria-label="Spice-jet"
                  value="Spice-jet"
                />
                <label
                  htmlFor="Spice-jet"
                  className="fw-semibold fs-7 text-muted"
                >
                  Auto
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="family"
                  aria-label="Family"
                  value="Family"
                />
                <label
                  htmlFor="Indidgo"
                  className="fw-semibold fs-7 text-muted"
                >
                  Prime-Sedan
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="five-star"
                  aria-label="5-Star"
                  value="5-Star"
                />
                <label
                  htmlFor="five-star"
                  className="fw-semibold fs-7 text-muted"
                >
                  Intercity
                </label>
              </li>
            </ul>

            <h5 className="font-weight-bold mb-3 card-label fs-3">
              Price Range
            </h5>
            <ul className="filterList list-unstyled">
              <li>
                <input
                  type="checkbox"
                  id="under-2000"
                  aria-label="Under 2000"
                  value="Under 2000"
                />
                <label
                  htmlFor="under-2000"
                  className="fw-semibold fs-7 text-muted"
                >
                  Under ₹2000
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="2000-6000"
                  aria-label="2000 - 6000"
                  value="2000 - 6000"
                />
                <label
                  htmlFor="2000-6000"
                  className="fw-semibold fs-7 text-muted"
                >
                  ₹2000 - ₹6000
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="custom-budget"
                  aria-label="Custom Budget"
                  value="Custom Budget"
                />
                <div className="mb-3">
                  <h4 className="card-label fs-3">Your Budget</h4>
                  <div className="d-flex">
                    <div className="d-flex flex-column mr-3">
                      <label className="d-block mb-2 fw-semibold fs-7 text-muted">
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
                      <label className="d-block mb-2 fw-semibold fs-7 text-muted">
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
              </li>
            </ul>

            <h5 className="font-weight-bold mb-3 card-label fs-3">Rating</h5>
            <ul className="filterList list-unstyled">
              <li>
                <input
                  type="checkbox"
                  id="very-good"
                  aria-label="Very Good"
                  value="Very Good"
                />
                <label
                  htmlFor="very-good"
                  className="fw-semibold fs-7 text-muted"
                >
                  Very Good
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="good"
                  aria-label="Good"
                  value="Good"
                />
                <label htmlFor="good" className="fw-semibold fs-7 text-muted">
                  Good
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="better"
                  aria-label="Better"
                  value="Better"
                />
                <label htmlFor="better" className="fw-semibold fs-7 text-muted">
                  Better
                </label>
              </li>
            </ul>

            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary">
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterPanelGround;
