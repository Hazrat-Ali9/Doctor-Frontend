import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AdminReviewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const {API} = useContext(AppContext);
  useEffect(() => {
    // Fetch all appointments on component mount
    fetch(`${API}/appointments`)
      .then(response => response.json())
      .then(data => {
        setAppointments(data);
        setFilteredAppointments(data);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    console.log("Before condition: ", status);
    if (status === 'all') {
      setFilteredAppointments(appointments);
    } else if (status === 'in progress'){
        console.log("In progress status: ", status);
      setFilteredAppointments(appointments.filter(app => app.status === 'progress'));
    } else if(status === 'rejected'){
        console.log("In reject status: ", status);
        setFilteredAppointments(appointments.filter(app => app.status === "reject"));
    } else if(status === 'completed'){
        console.log("In complete status: ", status);
        setFilteredAppointments(appointments.filter(app => app.status === "completed"));
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    fetch(`${API}/appointments/appointment/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(updatedAppointment => {
        // Update local state to reflect the status change
        setAppointments(prevAppointments =>
          prevAppointments.map(app =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
        // Re-apply the current filter
        handleFilterChange(filterStatus);
      })
      .catch(error => console.error('Error updating appointment:', error));
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Review Appointments</h2>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={() => handleFilterChange('all')}>All</button>
        <button className="btn btn-success me-2" onClick={() => handleFilterChange('completed')}>Accept</button>
        <button className="btn btn-danger me-2" onClick={() => handleFilterChange('rejected')}>Reject</button>
        <button className="btn btn-warning" onClick={() => handleFilterChange('in progress')}>Progress</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Patient Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Date</th>
              <th scope="col">Subject</th>
              <th scope="col">Message</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(appointment => (
                <tr key={appointment._id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.contact}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.subject}</td>
                  <td>{appointment.message}</td>
                  <td>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </td>
                  <td>
                    {appointment.status === 'progress' && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleStatusUpdate(appointment._id, 'completed')}
                      >
                        Accept
                      </button>
                    )}
                    {appointment.status === 'progress' && (
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleStatusUpdate(appointment._id, 'rejected')}
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviewAppointments;