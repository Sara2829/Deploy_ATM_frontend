import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface AddUserProps {
  onClose: () => void;
  onAdd: (user: User) => void;
}

interface User {
  username: string;
  email: string;
  password: string;
}

const AddUser: React.FC<AddUserProps> = ({ onClose, onAdd }) => {
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send the new user data to the API
    try {
      const response = await axios.post(`${API_URL}/auth/register`, newUser);
      console.log("User added:", response.data);
      onAdd(newUser); // Optionally call onAdd to update the UI with the new user
      onClose(); // Close the modal after adding the user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddUser}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
