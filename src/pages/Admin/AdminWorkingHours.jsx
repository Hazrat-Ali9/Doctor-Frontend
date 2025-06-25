import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/AdminWorkingHours.css'; // Custom CSS for styling
import { AppContext } from '../../context/AppContext';

const AdminWorkingHours = () => {
    const [workingHours, setWorkingHours] = useState([]);
    const {API} = useContext(AppContext)
    useEffect(() => {
        fetchWorkingHours();
    }, []);

    const fetchWorkingHours = async () => {
        try {
            const response = await axios.get(`${API}/working-hours/`);
            setWorkingHours(response.data);
        } catch (error) {
            console.error('Error fetching working hours:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this working hour?')) {
            try {
                await axios.delete(`${API}/working-hours/${id}`);
                fetchWorkingHours(); // Refresh the data
            } catch (error) {
                console.error('Error deleting working hour:', error);
            }
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Working Hours</h2>
            <Link to="/admin/workinghours/add" className="btn btn-primary mb-3">Add Working Hours</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Doctor Category</th>
                        <th>Doctor's Description</th>
                        <th>Days and Timing</th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workingHours.map(({ _id, doctorName, doctorCategory,doctorIntroduction, daysAndTiming }) => (
                        <tr key={_id}>
                            <td>{doctorName}</td>
                            <td>{doctorCategory}</td>
                            <td>{doctorIntroduction}</td>
                            <td>
                                {daysAndTiming.map((item, index) => (
                                    <div key={index}>
                                        {item.day}: {item.time}
                                    </div>
                                ))}
                            </td>
                            <td>
                                <Link to={`/admin/workinghours/${_id}`} className="btn btn-warning btn-sm mr-2">Update</Link>
                                <button onClick={() => handleDelete(_id)} className="btn btn-danger btn-sm mt-2">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminWorkingHours;
