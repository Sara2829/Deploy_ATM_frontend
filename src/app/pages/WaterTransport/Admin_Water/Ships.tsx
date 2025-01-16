import React, { useState } from "react";
import Pagination from "../../Pagination";
import AddShip from "./AddShip";
// import { AdminService } from "../../../../api/Service/AirTransport/Admin/AdminService";
// Example static data for ships
const mockShips = [
  {
    id: 1,
    name: "Ship A",
    type: "Cargo",
    capacity: 3000,
    status: "Active",
    available: true,
  },
  {
    id: 2,
    name: "Ship B",
    type: "Passenger",
    capacity: 1500,
    status: "Inactive",
    available: false,
  },
  {
    id: 3,
    name: "Ship C",
    type: "Cargo",
    capacity: 2500,
    status: "Active",
    available: true,
  },
];

export const ShipsPage: React.FC = () => {
  const [ships, setShips] = useState(mockShips);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddShipModal, setShowAddShipModal] = useState(false);
  const [status, setStatus] = useState("");

  const filteredShips = ships.filter((ship) =>
    ship.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const toggleAvailability = (id: number) => {
    setShips(
      ships.map((ship) =>
        ship.id === id ? { ...ship, available: !ship.available } : ship
      )
    );
  };

  // Define handleAddShip to handle adding a new ship
  const handleAddShip = (newShip: {
    name: string;
    type: string;
    capacity: number;
    status: string;
    available: boolean;
  }) => {
    const newShipWithId = { ...newShip, id: ships.length + 1 };
    setShips([...ships, newShipWithId]);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Ships</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Ships: {filteredShips.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Ships"
            value={search}
            onChange={handleSearchChange}
          />
          {/* <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
          >
            <i className="fs-2 bi bi-funnel" />
            Filter
          </button> */}

          <div className="d-flex align-items-center">
            {/* begin::Label */}
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">
              Sort By:
            </span>
            {/* end::Label */}

            {/* begin::Select */}
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              data-control="select2"
              data-placeholder="All"
              data-hide-search="true"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value=""></option>
              <option value="1">All</option>
              <option value="2">Avaible</option>
              <option value="3">Active</option>
              <option value="3">Cargo</option>
              <option value="3">Passenger</option>
            </select>
            {/* end::Select  */}
          </div>

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddShipModal(true)} // Open the modal
          >
            <i className="fs-2 bi bi-plus" />
            Add New Ship
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Name</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShips
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((ship) => (
                  <tr key={ship.id}>
                    <td>{ship.name}</td>
                    <td>{ship.type}</td>
                    <td>{ship.capacity}</td>
                    <td>{ship.status}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={ship.available}
                        onChange={() => toggleAvailability(ship.id)}
                      />
                    </td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button
                          className="btn btn-icon btn-bg-light btn-sm me-1"
                          //Viewbutton functionality
                        >
                          <i className="ki-duotone ki-eye fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          // Edit button functionality
                        >
                          <i className="ki-duotone ki-pencil fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          // Delete button functionality
                        >
                          <i className="ki-duotone ki-trash fs-3 text-danger">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                          </i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredShips.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add Ship Modal */}
      {showAddShipModal && (
        <AddShip
          onClose={() => setShowAddShipModal(false)}
          onAdd={handleAddShip}
        />
      )}
    </div>
  );
};
