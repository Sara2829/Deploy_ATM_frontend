import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../Pagination";
import AddAirUser from "./AddUser"; // AddAirUser modal

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AirUserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // Updated type to any[] for more flexibility
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/all`);
        console.log("Air users response:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching air users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
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

  const handleAddUser = (newUser: { username: string; email: string }) => {
    const newUserWithId = { ...newUser, id: users.length + 1 };
    setUsers((prevUsers) => [...prevUsers, newUserWithId]);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Air Users</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Users: {filteredUsers.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Air Users"
            value={search}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddUserModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New User
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password ? user.password : "Not Provided"}</td>
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
          totalPages={Math.ceil(filteredUsers.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddAirUser
          onClose={() => setShowAddUserModal(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
};
