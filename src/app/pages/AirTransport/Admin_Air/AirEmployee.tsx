import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AirEmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");
  const [newCrew, setNewCrew] = useState({
    name: "",
    role: "",
    availability: true,
    adminId: 1,
  });
  const [editCrew, setEditCrew] = useState({
    id: "",
    name: "",
    role: "",
    availability: true,
  });

  // Fetch crew data on mount
  useEffect(() => {
    fetchCrewData();
  }, []);

  const fetchCrewData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/crew-management/all`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch crew data:", error);
    }
  };

  const filteredEmployees = employees.filter(
    (employee: any) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter ? employee.role === roleFilter : true)
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

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setRoleFilter(e.target.value);

  const handleAddCrewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/crew-management`, newCrew);
      alert("New crew added successfully!");
      setShowAddEmployeeModal(false);
      setNewCrew({ name: "", role: "", availability: true, adminId: 1 });
      fetchCrewData(); // Refresh crew data
    } catch (error) {
      console.error("Failed to add new crew:", error);
      alert("Failed to add new crew. Please try again.");
    }
  };

  const handleEditCrewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/crew-management/${editCrew.id}`,
        editCrew
      );
      alert("Crew details updated successfully!");
      setShowEditEmployeeModal(false);
      fetchCrewData(); // Refresh crew data
    } catch (error) {
      console.error("Failed to update crew details:", error);
      alert("Failed to update crew details. Please try again.");
    }
  };

  const handleDeleteCrew = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/crew-management/${id}`);
      alert("Crew deleted successfully!");
      fetchCrewData(); // Refresh crew data
    } catch (error) {
      console.error("Failed to delete crew:", error);
      alert("Failed to delete crew. Please try again.");
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Air Employees</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Employees: {filteredEmployees.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Air Employees"
            value={search}
            onChange={handleSearchChange}
          />

          <div className="d-flex align-items-center">
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">
              Filter By Role:
            </span>
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              data-control="select2"
              data-placeholder="All"
              data-hide-search="true"
              value={roleFilter}
              onChange={handleRoleFilterChange}
            >
              <option value="">All</option>
              <option value="PILOT">Pilot</option>
              <option value="CABIN_CREW">Cabin Crew</option>
              <option value="GROUND_STAFF">Ground Staff</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={() => setShowAddEmployeeModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New Employee
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
                <th>Role</th>
                <th>Availability</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((employee: any) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>
                      {employee.availability ? "Available" : "Unavailable"}
                    </td>
                    <td className="text-center">
                      {/* Edit Button */}
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          setEditCrew(employee);
                          setShowEditEmployeeModal(true);
                        }}
                      >
                        <i
                          className="bi bi-pencil"
                          style={{ fontSize: "16px", marginRight: "5px" }}
                        />
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCrew(employee.id)}
                      >
                        <i
                          className="bi bi-trash"
                          style={{ fontSize: "16px", marginRight: "5px" }}
                        />
                        Delete
                      </button>
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
          totalPages={Math.ceil(filteredEmployees.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Crew</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddEmployeeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddCrewSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCrew.name}
                      onChange={(e) =>
                        setNewCrew({ ...newCrew, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={newCrew.role}
                      onChange={(e) =>
                        setNewCrew({ ...newCrew, role: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="PILOT">Pilot</option>
                      <option value="CABIN_CREW">Cabin Crew</option>
                      <option value="GROUND_STAFF">Ground Staff</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Availability</label>
                    <select
                      className="form-select"
                      value={newCrew.availability ? "true" : "false"}
                      onChange={(e) =>
                        setNewCrew({
                          ...newCrew,
                          availability: e.target.value === "true",
                        })
                      }
                      required
                    >
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowAddEmployeeModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Crew
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditEmployeeModal && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Crew</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditEmployeeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditCrewSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editCrew.name}
                      onChange={(e) =>
                        setEditCrew({ ...editCrew, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={editCrew.role}
                      onChange={(e) =>
                        setEditCrew({ ...editCrew, role: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="PILOT">Pilot</option>
                      <option value="CABIN_CREW">Cabin Crew</option>
                      <option value="GROUND_STAFF">Ground Staff</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Availability</label>
                    <select
                      className="form-select"
                      value={editCrew.availability ? "true" : "false"}
                      onChange={(e) =>
                        setEditCrew({
                          ...editCrew,
                          availability: e.target.value === "true",
                        })
                      }
                      required
                    >
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowEditEmployeeModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
