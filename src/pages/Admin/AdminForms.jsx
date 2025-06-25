import React, { useContext, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../../css/AddHospitalForm.css'; // Import custom CSS
import { AppContext } from '../../context/AppContext';

const AddHospitalForm = () => {
    const [formData, setFormData] = useState({
        logo: null,
        contactNumber: '',
        email: '',
        openingTime: '',
        closingTime: '',
        openingDays: [],
        location: '',
        footerText: ''
    });
    const {API} = useContext(AppContext);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo') {
            setFormData({ ...formData, logo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleDaysChange = (e) => {
        const { value } = e.target;
        setFormData((prev) => {
            const newDays = prev.openingDays.includes(value)
                ? prev.openingDays.filter(day => day !== value) // Uncheck
                : [...prev.openingDays, value]; // Check
            return { ...prev, openingDays: newDays };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'logo') {
                data.append(key, value); // Append the file
            } else {
                data.append(key, value);
            }
        });

        try {
            const response = await axios.post(`${API}/clinic/add`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding hospital:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add Hospital</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="logo" className="form-label">Logo</label>
                    <input type="file" name="logo" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                    <input type="text" name="contactNumber" className="form-control" placeholder="Contact Number" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="openingTime" className="form-label">Opening Time</label>
                    <input type="time" name="openingTime" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="closingTime" className="form-label">Closing Time</label>
                    <input type="time" name="closingTime" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Opening Days</label>
                    <div>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <div key={day} className="form-check">
                                <input
                                    type="checkbox"
                                    value={day}
                                    className="form-check-input"
                                    onChange={handleDaysChange}
                                />
                                <label className="form-check-label">{day}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" name="location" className="form-control" placeholder="Location" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="footerText" className="form-label">Footer Text</label>
                    <textarea name="footerText" className="form-control" placeholder="Footer Text" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Hospital</button>
            </form>
        </div>
    );
};

export default AddHospitalForm;
