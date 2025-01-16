import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ShipDetailsPage: React.FC = () => {
  const location = useLocation();
  const cruise = location.state as {
    name: string;
    image: string;
    description: string;
    rating: number;
    price: number;
    gallery: string[]; // Array of image URLs
  };

  const [travelDate, setTravelDate] = useState<string>("");
  const [numTravelers, setNumTravelers] = useState<number>(1);

  // State for user information
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSaveBooking = () => {
    const bookingDetails = {
      cruise,
      travelDate,
      numTravelers,
      userInfo,
    };
    // Navigate to Summary Page with state
    navigate("/summary", { state: bookingDetails });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Ship Details</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={cruise.image}
                alt={cruise.name}
                className="img-fluid rounded-start"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h5 className="card-title">{cruise.name}</h5>
              <p className="card-text">{cruise.description}</p>
              <p className="card-text">
                <strong>Price: ₹{cruise.price}</strong>
              </p>

              {/* User Information */}
              <div>
                <div>
                  <h3>Name:</h3>
                  <input
                    type="text"
                    className="form-control"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <h3>Mobile No:</h3>
                  <input
                    type="text"
                    className="form-control"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <h3>Email id:</h3>
                  <input
                    type="email"
                    className="form-control"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-3">
                <label className="form-label">Check-in Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
                <label className="form-label">Check-out Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </div>

              {/* Amenities */}
              <div>
                <h3>Amenities</h3>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <li>Restaurant</li>
                  <li>Indoor games</li>
                  <li>Free parking</li>
                  <li>Dining Area</li>
                  <li>Air conditioning</li>
                </ul>
              </div>

              {/* Number of Travelers */}
              <div className="mb-3">
                <label className="form-label">Number of Travelers</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={numTravelers}
                  onChange={(e) => setNumTravelers(Number(e.target.value))}
                />
              </div>

              {/* Gallery */}
              <div>
                <h3>Image Gallery</h3>
                <div className="gallery">
                  {cruise.gallery && cruise.gallery.length > 0 ? (
                    <div className="row justify-content-start">
                      {cruise.gallery.map((image, index) => (
                        <div key={index} className="col-md-4 mb-3">
                          <img
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            className="img-fluid"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No gallery images available.</p>
                  )}
                </div>
              </div>

              {/* Save Booking Button */}
              <button
                className="btn btn-primary float-end"
                onClick={handleSaveBooking}
              >
                Save Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipDetailsPage;
