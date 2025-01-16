import React from "react";
import { useNavigate } from "react-router-dom";

const CruisePage: React.FC = () => {
  const cruises = [
    {
      name: "Luxury Cruise",
      image:
        "https://s3.eu-west-1.amazonaws.com/mundy.assets.d3r.com/images/hero_large/93443-predicting-the-future-of-luxury-cruising-with-ai.png",
      description:
        "Experience the luxury of sailing with world-class amenities.",
      rating: 4.5,
      price: 5000,
    },
    {
      name: "Premium Cruise",
      image:
        "https://luxury-tours.in/wp-content/uploads/2024/07/cruises-1.webp",
      description:
        "A premium cruise with unforgettable views and top-notch services.",
      rating: 4.2,
      price: 4000,
    },
    {
      name: "Family Cruise",
      image:
        "https://s3.eu-west-1.amazonaws.com/mundy.assets.d3r.com/images/hero_large/93443-predicting-the-future-of-luxury-cruising-with-ai.png",
      description:
        "Perfect for families with kid-friendly activities and amenities.",
      rating: 4.8,
      price: 6000,
    },
  ];

  const navigate = useNavigate();

  const handleBookNow = (cruise: (typeof cruises)[0]) => {
    navigate("/ship-details", { state: cruise }); // Passing cruise details to the new page
  };

  return (
    <div className="container mt-4 d-flex">
      <div className="cruise-cards-container" style={{ width: "75%" }}>
        <div className="card shadow-sm mt-4">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                Cruises Available
              </span>
            </h3>
          </div>
          <div
            className="card-body"
            style={{
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              padding: "1rem", // Added padding inside the card body
              width: "100%", // Ensure it takes up the full width of the container
            }}
          >
            {cruises.map((cruise, index) => (
              <div key={index} className="card mb-4 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src={cruise.image}
                      alt={cruise.name}
                      className="img-fluid rounded-start"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{cruise.name}</h5>
                      <p className="card-text">{cruise.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Rating: {cruise.rating}
                        </small>
                      </p>
                      <p className="card-text">
                        <strong>Price: ₹{cruise.price}</strong>
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBookNow(cruise)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CruisePage;
