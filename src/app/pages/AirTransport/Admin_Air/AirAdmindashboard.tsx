import React, { useState, useEffect } from "react";  // For useState, useEffect hooks
import axios from "axios";  // For making HTTP requests

const API_URL = import.meta.env.VITE_APP_API_URL;

const AirAdmindashboard: React.FC = () => {
  const [users, setUsers] = useState([]); 
  const [flights, setFlights] = useState([]);
  const [employees, setEmployees] = useState([]);  // State for employees
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);  // Loading state for employees

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/all`);
        setUsers(response.data);
        console.log("Users response:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch flights from the API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${API_URL}/flights/all`);
        setFlights(response.data);
        console.log("Flights response:", response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoadingFlights(false);
      }
    };
    fetchFlights();
  }, []);

  // Fetch employees from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_URL}/crew-management/all`); // Make sure this API endpoint exists
        setEmployees(response.data);
        console.log("Employees response:", response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoadingEmployees(false);
      }
    };
    fetchEmployees();
  }, []);  // Empty dependency array to fetch once on component mount

  return (
    <div style={{ padding: '20px' }}>
      {/* Dashboard Grid for 3 Boxes (User, Employee, and Flight) */}
      <div className="row" style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {/* User Section */}
        <div className="col" style={{ flex: '1 1 30%', maxWidth: '33.33%' }}>
          <div
            className="card"
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              border: '1px solid #ddd',
              overflow: 'hidden',
              height: '400px',
            }}
          >
            <div className="card-header text-center" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px' }}>
              <h3 className="card-title">Air Users</h3>
              <p>Total Users: {users.length}</p>
            </div>
            <div className="card-body" style={{ padding: '15px', maxHeight: '300px', overflowY: 'auto' }}>
              {loadingUsers ? (
                <div>Loading Users...</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr className="fw-bold">
                        <th>Username</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: { id: number; username: string; email: string }) => (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Employee Section */}
       
<div className="col" style={{ flex: '1 1 30%', maxWidth: '33.33%' }}>
  <div
    className="card"
    style={{
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      border: '1px solid #ddd',
      overflow: 'hidden',
      height: '400px',
    }}
  >
    <div className="card-header text-center" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px' }}>
      <h3 className="card-title">Employees</h3>
    </div>
    <div className="card-body" style={{ padding: '15px', maxHeight: '300px', overflowY: 'auto' }}>
      {loadingEmployees ? (
        <div>Loading Employees...</div>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {employees.map((employee: { id: number; name: string; role: string; availability: boolean }) => (
            <li
              key={employee.id}
              style={{
                marginBottom: '10px',
                backgroundColor: '#f8f9fa',
                padding: '8px',
                borderRadius: '5px',
              }}
            >
              <strong>{employee.name}</strong> ({employee.role}) <br />
              Availability: {employee.availability ? 'Available' : 'Not Available'}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>

      </div>

      {/* Flight Section Below */}
      <div
        className="card"
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          border: '1px solid #ddd',
          overflow: 'hidden',
          marginTop: '20px',
        }}
      >
        <div className="card-header text-center" style={{ backgroundColor: '#17a2b8', color: 'white', padding: '10px' }}>
          <h3 className="card-title">Flights</h3>
        </div>
        <div className="card-body" style={{ padding: '15px' }}>
          {loadingFlights ? (
            <div>Loading Flights...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr className="fw-bold">
                    <th>Name</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Airline</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight: { id: number; flightName: string; departure: string; arrival: string; source: string; destination: string; price: string; airline: string; flightClass: string }) => (
                    <tr key={flight.id}>
                      <td>{flight.flightName || "N/A"}</td>
                      <td>{flight.departure}</td>
                      <td>{flight.arrival}</td>
                      <td>{flight.source}</td>
                      <td>{flight.destination}</td>
                      <td>{flight.price}</td>
                      <td>{flight.airline}</td>
                      <td>{flight.flightClass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirAdmindashboard;
