// import React, { useState } from "react";
// import DeleteFlight from "./DeleteFlight";

// const FlightsPage = () => {
//   const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

//   const handleDelete = (id: number) => {
//     console.log(Flight with ID ${id} deleted.);
//     setSelectedFlight(null); // Close the modal after deletion
//   };





//   const handleCancel = () => setSelectedFlight(null);

//   return (
//     <div>
//       {/* Example flight deletion */}
//       <button onClick={() => setSelectedFlight({ id: 1, flightName: "Flight A" })}>
//         Delete Flight A
//       </button>

//       <DeleteFlight
//         selectedFlight={selectedFlight}
//         onDelete={handleDelete}
//         onCancel={handleCancel}
//       />
//     </div>
//   );
// };

// export default FlightsPage;