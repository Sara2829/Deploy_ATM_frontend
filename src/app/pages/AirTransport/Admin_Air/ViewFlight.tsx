// import React from "react";

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
//   adminId: number;
// }

// interface ViewFlightProps {
//   flight: Flight;
//   onClose: () => void;
// }

// ///get flight by id

// const ViewFlight: React.FC<ViewFlightProps> = ({ flight, onClose }) => {
//   return (
//     <div className="modal fade show" style={{ display: "block" }}>
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Flight Details</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <table className="table">
//               <tbody>
//                 <tr>
//                   <th>Flight Name</th>
//                   <td>{flight.flightName}</td>
//                 </tr>
//                 <tr>
//                   <th>Departure</th>
//                   <td>{flight.departure}</td>
//                 </tr>
//                 <tr>
//                   <th>Arrival</th>
//                   <td>{flight.arrival}</td>
//                 </tr>
//                 <tr>
//                   <th>Source</th>
//                   <td>{flight.source}</td>
//                 </tr>
//                 <tr>
//                   <th>Destination</th>
//                   <td>{flight.destination}</td>
//                 </tr>
//                 <tr>
//                   <th>Price</th>
//                   <td>${flight.price}</td>
//                 </tr>
//                 <tr>
//                   <th>Airline</th>
//                   <td>{flight.airline}</td>
//                 </tr>
//                 <tr>
//                   <th>Flight Class</th>
//                   <td>{flight.flightClass}</td>
//                 </tr>
//                 <tr>
//                   <th>Admin ID</th>
//                   <td>{flight.adminId}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewFlight;