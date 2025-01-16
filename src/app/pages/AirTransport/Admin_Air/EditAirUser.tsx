import React, { useState, useEffect } from "react";


interface EditAirUserProps {
  user: { id: number; username: string; email: string };
  onClose: () => void;
  onUpdate: (updatedUser: { id: number; username: string; email: string }) => void;
}


const EditAirUser: React.FC<EditAirUserProps> = ({ user, onClose, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  const handleSave = () => {
    const updatedUser = { id: user.id, username, email };
    onUpdate(updatedUser);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Edit User</h3>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditAirUser;
