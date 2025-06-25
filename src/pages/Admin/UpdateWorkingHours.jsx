import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/UpdateWorkingHours.css'; // Custom CSS for styling
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const UpdateWorkingHours = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workingHour, setWorkingHour] = useState({
        doctorName: '',
        doctorCategory: '',
        doctorIntroduction: '', // Added state for doctorIntroduction
        daysAndTiming: [{ day: '', time: '' }],
    });
    const {API} = useContext(AppContext);
    useEffect(() => {
        const fetchWorkingHour = async () => {
            try {
                const response = await axios.get(`${API}/working-hours/${id}`);
                setWorkingHour(response.data);
            } catch (error) {
                console.error('Error fetching working hour:', error);
            }
        };

        fetchWorkingHour();
    }, [id]);

    const handleChangeDayAndTime = (index, event) => {
        const { name, value } = event.target;
        const newDaysAndTiming = [...workingHour.daysAndTiming];
        newDaysAndTiming[index][name] = value;
        setWorkingHour({ ...workingHour, daysAndTiming: newDaysAndTiming });
    };

    const handleAddDayAndTime = () => {
        setWorkingHour({ ...workingHour, daysAndTiming: [...workingHour.daysAndTiming, { day: '', time: '' }] });
    };

    const handleRemoveDayAndTime = (index) => {
        const newDaysAndTiming = workingHour.daysAndTiming.filter((_, i) => i !== index);
        setWorkingHour({ ...workingHour, daysAndTiming: newDaysAndTiming });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${API}/working-hours/${id}`, workingHour);
            navigate('/admin/workinghours'); // Redirect to the working hours page
            toast.success("Updated Working Hours")
        } catch (error) {
            console.error('Error updating working hours:', error);
            toast.error("Error in updating. Check your internet");
        }
    };

    return (
        <div className="container card mt-2" style={{ width: '70%', margin: 'auto', padding: '20px' }}>
            <h2 className="text-center">Update Working Hours</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label" style={{ flex: "13% 0 0" }}>Doctor Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={workingHour.doctorName}
                        placeholder='Enter Doctor Name'
                        onChange={(e) => setWorkingHour({ ...workingHour, doctorName: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label" style={{ flex: "13% 0 0" }}>Doctor Category</label>
                    <input
                        type="text"
                        className="form-control"
                        value={workingHour.doctorCategory}
                        placeholder='Enter Doctor Category'
                        onChange={(e) => setWorkingHour({ ...workingHour, doctorCategory: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label" style={{ flex: "13% 0 0" }}>Doctor Introduction</label>
                    <textarea
                        className="form-control"
                        value={workingHour.doctorIntroduction}
                        placeholder='Enter Doctor Introduction'
                        onChange={(e) => setWorkingHour({ ...workingHour, doctorIntroduction: e.target.value })}
                        required
                    />
                </div>
                <div className='timing-field'>
                    <h5>Days and Timing</h5>
                    {workingHour.daysAndTiming.map((item, index) => (
                        <div key={index} className="d-flex mb-2">
                            <select className="form-select" name="day" value={item.day} onChange={(e) => handleChangeDayAndTime(index, e)} required>
                                <option value="">Select a Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Time (e.g. 09:00 AM - 05:00 PM)"
                                name="time"
                                value={item.time}
                                onChange={(e) => handleChangeDayAndTime(index, e)}
                                required
                            />
                            <button type="button" className="btn btn-danger ms-2" onClick={() => handleRemoveDayAndTime(index)}>🗑️</button>
                        </div>
                    ))}
                </div>
                <button type="button" className="btn btn-success mb-3" onClick={handleAddDayAndTime}>Add Another Day & Time</button>
                <br />
                <button type="submit" className="btn btn-primary">Update Working Hours</button>
                <button type="button" className="btn btn-secondary" style={{ marginLeft: "1vw" }} onClick={() => navigate('/admin/workinghours')}>Back</button>
            </form>
        </div>
    );
};

export default UpdateWorkingHours;
