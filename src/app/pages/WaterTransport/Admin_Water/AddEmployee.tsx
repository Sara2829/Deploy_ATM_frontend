import React, { useState } from "react";

interface AddEmployeeProps {
  onClose: () => void;
  onAdd: (employee: Employee) => void;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
  isActive: boolean;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onClose, onAdd }) => {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    name: "",
    position: "",
    department: "",
    salary: 0,
    isActive: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
   
    onAdd(newEmployee);
    onClose(); 
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Employee</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddEmployee}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rank</label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={newEmployee.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={newEmployee.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
