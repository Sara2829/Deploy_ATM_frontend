import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const MyBooking = () => {
  const [bookingDetails, setBookingDetails] = useState<any[]>([]); // Array to store multiple bookings
  const [flightDetails, setFlightDetails] = useState<any>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const bookingId = localStorage.getItem("bookingId");
      const storedFlightDetails = localStorage.getItem("flightDetails");

      if (!bookingId) {
        alert("No booking ID found in local storage.");
        return;
      }

      if (storedFlightDetails) {
        setFlightDetails(JSON.parse(storedFlightDetails));
      }

      try {
        const response = await axios.get(`${API_URL}/bookings/${bookingId}`);
        
        // Append the new booking to the list of bookings
        setBookingDetails((prevBookingDetails) => [
          ...prevBookingDetails,
          response.data,
        ]);
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
        alert("Failed to fetch booking details. Please try again.");
      }
    };

    fetchBookingDetails();
  }, []);

  if (!flightDetails) {
    return <div>Loading flight details...</div>;
  }

  if (bookingDetails.length === 0) {
    return <div>Loading booking details...</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Booking Details</h3>

      {/* Loop over all bookings and display their details */}
      {bookingDetails.map((booking) => (
        <div key={booking.id} className="card shadow-sm mb-3">
          <div className="card-header">
            <h5 className="card-title">Booking ID: {booking.id}</h5>
          </div>
          <div className="card-body">
            <p><strong>Flight Name:</strong> {flightDetails.name}</p>
            <p><strong>Travelers:</strong> {booking.travellerCount}</p>
            <p><strong>Source:</strong> {flightDetails.source}</p>
            <p><strong>Destination:</strong> {flightDetails.destination}</p>
            <p><strong>Price:</strong> ₹{flightDetails.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
