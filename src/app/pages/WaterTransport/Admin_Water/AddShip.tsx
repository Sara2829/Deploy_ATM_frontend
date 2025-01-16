import React, { useState } from "react";

interface AddShipProps {
  onClose: () => void;
  onAdd: (ship: Ship) => void;
}

interface Ship {
  id: number;
  name: string;
  type: string;
  capacity: number;
  status: string;
  available: boolean;
}

const AddShip: React.FC<AddShipProps> = ({ onClose, onAdd }) => {
  const [newShip, setNewShip] = useState<Ship>({
    id: 0,
    name: "",
    type: "",
    capacity: 0,
    status: "Active", // Default to Active
    available: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewShip({ ...newShip, [name]: value });
  };

  const handleAddShip = async (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newShip);
    onClose();
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Ship</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddShip}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newShip.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  value={newShip.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  value={newShip.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={newShip.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Available</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="available"
                  checked={newShip.available}
                  onChange={(e) =>
                    setNewShip({ ...newShip, available: e.target.checked })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Ship
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShip;
