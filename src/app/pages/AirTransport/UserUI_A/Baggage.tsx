import React, { useEffect, useState } from "react";

export const Baggage = () => {
  const [baggageDetails, setBaggageDetails] = useState<any>(null);

  useEffect(() => {
    const storedBaggageDetails = localStorage.getItem("baggageDetails");

    if (storedBaggageDetails) {
      setBaggageDetails(JSON.parse(storedBaggageDetails));
    } else {
      alert("No baggage details found in local storage.");
    }
  }, []);

  if (!baggageDetails) {
    return <div>Loading baggage details...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Baggage Details</h3>
        </div>
        <div className="card-body">
          <p><strong>Weight:</strong> {baggageDetails.weight} kg</p>
          <p><strong>Bag Count:</strong> {baggageDetails.bagCount}</p>
        </div>
      </div>
    </div>
  );
};