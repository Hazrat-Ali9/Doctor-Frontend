import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../css/AddWorkingHours.css";
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const AddWorkingHours = () => {
    const [doctorName, setDoctorName] = useState('');
    const [doctorCategory, setDoctorCategory] = useState('');
    const [doctorIntroduction, setDoctorIntroduction] = useState(''); // Added state for doctorIntroduction
    const [daysAndTiming, setDaysAndTiming] = useState([{ day: '', time: '' }]);
    const navigate = useNavigate();
    const {API} = useContext(AppContext);
    const handleChangeDayAndTime = (index, event) => {
        const { name, value } = event.target;
        const newDaysAndTiming = [...daysAndTiming];
        newDaysAndTiming[index][name] = value;
        setDaysAndTiming(newDaysAndTiming);
    };

    const handleAddDayAndTime = () => {
        setDaysAndTiming([...daysAndTiming, { day: '', time: '' }]);
    };

    const handleRemoveDayAndTime = (index) => {
        const newDaysAndTiming = daysAndTiming.filter((_, i) => i !== index);
        setDaysAndTiming(newDaysAndTiming);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const workingHourData = { 
            doctorName, 
            doctorCategory, 
            doctorIntroduction, // Include doctorIntroduction here
            daysAndTiming 
        };

        try {
            await axios.post(`${API}/working-hours/add`, workingHourData);
            navigate('/admin/workinghours'); // Redirect to the working hours page
            toast.success("Added Successful");
        } catch (error) {
            console.error('Error adding working hours:', error);
            toast.error("Error! Please try again later");
        }
    };

    return (
        <div className="container card mt-2" style={{ width: '100%', maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2 className="text-center">Add Working Hours</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex flex-column">
                    <label className='form-label'>Doctor Name</label>
                    <input type="text" className="form-control" value={doctorName} placeholder='Enter Doctor Name' onChange={(e) => setDoctorName(e.target.value)} required />
                </div>
                <div className="mb-3 d-flex flex-column">
                    <label className="form-label">Doctor Category</label>
                    <input type="text" className="form-control" placeholder="Enter Doctor Category" value={doctorCategory} onChange={(e) => setDoctorCategory(e.target.value)} required />
                </div>
                <div className="mb-3 d-flex flex-column">
                    <label className="form-label">Doctor Introduction</label>
                    <textarea className="form-control" placeholder="Enter Doctor Introduction" value={doctorIntroduction} onChange={(e) => setDoctorIntroduction(e.target.value)} required />
                </div>
                <div className='timing-field'>
                    <h5>Days and Timing</h5>
                    {daysAndTiming.map((item, index) => (
                        <div key={index} className="d-flex mb-2 flex-column">
                            <select className="form-select mb-1" name="day" value={item.day} onChange={(e) => handleChangeDayAndTime(index, e)} required>
                                <option value="">Select a Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <input type="text" className="form-control mb-1" placeholder="Time (e.g. 09:00 AM - 05:00 PM)" name="time" value={item.time} onChange={(e) => handleChangeDayAndTime(index, e)} required />
                            <button type="button" className="btn btn-danger w-25" onClick={() => handleRemoveDayAndTime(index)}>Delete 🗑️</button>
                        </div>
                    ))}
                </div>
                <div style={{display: "flex", justifyContent:"center", flexDirection:"column", alignContent:"center"}}>
                <button type="button" className="btn btn-success mb-3" onClick={handleAddDayAndTime}>Add Another Day & Time</button>
                <button type="submit" className="btn btn-primary">Add Working Hours</button>
                <button type="button" className="btn btn-secondary" style={{ marginLeft: "1vw" }} onClick={() => navigate('/admin/workinghours')}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default AddWorkingHours;
