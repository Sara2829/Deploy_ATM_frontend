// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_APP_API_URL;

// interface EditFlightProps {
//   flight: Flight;
//   onClose: () => void;
//   onUpdate: (flight: Flight) => void;
// }

// interface Flight {
//   id: number;
//   flightName: string;
//   departure: string;
//   arrival: string;
//   source: string;
//   destination: string;
//   price: number;
//   airline: string;
//   flightClass: string;
//   adminId: number; // Assuming this remains static
// }

// const EditFlight: React.FC<EditFlightProps> = ({ flight, onClose, onUpdate }) => {
//   const [updatedFlight, setUpdatedFlight] = useState<Flight>(flight);

//   useEffect(() => {
//     setUpdatedFlight(flight);
//   }, [flight]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setUpdatedFlight({ ...updatedFlight, [name]: value });
//   };

//   const handleUpdateFlight = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Send the updated flight data to the API
//     try {
//       const response = await axios.put(
//         ${API_URL}/flights/schedule/${updatedFlight.id},
//         updatedFlight
//       );
//       console.log("Flight updated:", response.data);
//       onUpdate(updatedFlight); // Update the UI with the modified flight
//       onClose(); // Close the modal after updating the flight
//     } catch (error) {
//       console.error("Error updating flight:", error);
//     }
//   };

//   return (
//     <div className="modal fade show" style={{ display: "block" }}>
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Edit Flight</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleUpdateFlight}>
//               <div className="mb-3">
//                 <label className="form-label">Flight Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="flightName"
//                   value={updatedFlight.flightName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Departure</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="departure"
//                   value={updatedFlight.departure}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Arrival</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="arrival"
//                   value={updatedFlight.arrival}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Source</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="source"
//                   value={updatedFlight.source}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Destination</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="destination"
//                   value={updatedFlight.destination}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Price</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   name="price"
//                   value={updatedFlight.price}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Airline</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="airline"
//                   value={updatedFlight.airline}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Flight Class</label>
//                 <select
//                   className="form-select"
//                   name="flightClass"
//                   value={updatedFlight.flightClass}
//                   onChange={handleInputChange}
//                 >
//                   <option value="Economy">Economy</option>
//                   <option value="Business">Business</option>
//                   <option value="First Class">First Class</option>
//                 </select>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Update Flight
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditFlight;