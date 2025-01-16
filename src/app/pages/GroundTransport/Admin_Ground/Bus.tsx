import React, { useState } from "react";
import Pagination from "../../Pagination";
import AddBus from "../Admin_Ground/AddBus";

// Example static data for buses
const mockBuses = [
  { id: 1, name: "Bus A", type: "Seater", capacity: 50, status: "Active", available: true },
  { id: 2, name: "Bus B", type: "Sleeper", capacity: 30, status: "Inactive", available: false },
  { id: 3, name: "Bus C", type: "Seater", capacity: 50, status: "Active", available: true },
];

export const BusesPage: React.FC = () => {
  const [buses, setBuses] = useState(mockBuses);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddBusModal, setShowAddBusModal] = useState(false); 
  const [status, setStatus] = useState("");

  const filteredBuses = buses.filter((bus) =>
    bus.name.toLowerCase().includes(search.toLowerCase())
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
    setBuses(
      buses.map((bus) =>
        bus.id === id ? { ...bus, available: !bus.available } : bus
      )
    );
  };

  // Define handleAddBus to handle adding a new bus
  const handleAddBus = (newBus: { name: string; type: string; capacity: number; status: string; available: boolean }) => {
    const newBusWithId = { ...newBus, id: buses.length + 1 }; 
    setBuses([...buses, newBusWithId]); 
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Bus</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Buses: {filteredBuses.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Buses"
            value={search}
            onChange={handleSearchChange}
          />

          <div className='d-flex align-items-center'>
            {/* begin::Label */}
            <span className='fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block'>
              Sort By:
            </span>
            {/* end::Label */}

            {/* begin::Select */}
            <select
              className='form-select form-select-sm form-select-solid w-100px w-xxl-125px'
              data-control='select2'
              data-placeholder='All'
              data-hide-search='true'
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value=''></option>
              <option value='1'>All</option>
              <option value='2'>Available</option>
              <option value='3'>Active</option>
              <option value='3'>Sleeper</option>
              <option value='3'>Seater</option>
            </select>
            {/* end::Select  */}
          </div>

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddBusModal(true)} 
          >
            <i className="fs-2 bi bi-plus" />
            Add New Bus
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
              {filteredBuses
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.name}</td>
                    <td>{bus.type}</td>
                    <td>{bus.capacity}</td>
                    <td>{bus.status}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={bus.available}
                        onChange={() => toggleAvailability(bus.id)}
                      />
                    </td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                         <button
                          className="btn btn-icon btn-bg-light btn-sm me-1"
                          //View button functionality
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
          totalPages={Math.ceil(filteredBuses.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add Bus Modal */}
      {showAddBusModal && (
        <AddBus
          onClose={() => setShowAddBusModal(false)} 
          onAdd={handleAddBus} 
        />
      )}
    </div>
  );
};
