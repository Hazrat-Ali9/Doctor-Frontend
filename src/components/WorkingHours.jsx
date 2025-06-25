import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../css/WorkingHours.css";
import doctorImage from "../assets/images/doctor.png";
import axios from "axios";

const WorkingHours = () => {
  const { openModal } = useContext(AppContext);
  const [workingHours, setWorkingHours] = useState([]); // State to store API data
  const API_URL = "http://localhost:5000/api/working-hours"; // API endpoint

  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const response = await axios.get(API_URL);
        setWorkingHours(response.data); // Set API data to state
      } catch (error) {
        console.error("Error fetching working hours:", error);
      }
    };

    fetchWorkingHours();
  }, []);

  if (workingHours.length === 0) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  return (
    <div className="app-container c-width-1 com-margin">
      {workingHours.map((doctor) => (
        <div key={doctor._id} className="doctor-section">
          {/* First Column - Working Hours */}
          <div className="column working-hours-container" style={{ flex: "1.1 0 0" }}>
            <h2 className="working-hours-title c-white">Working Hours</h2>
            <div className="hospital-info">
              <h3 className="hospital-name c-white">{doctor.doctorName}</h3>
              <h4 className="c-white">{doctor.doctorCategory}</h4>
              <div className="schedule">
                {doctor.daysAndTiming.map((time) => (
                  <div key={time._id} className="d-flex justify-content-between">
                    <div>
                      <p className="c-white">
                        <strong>{time.day}</strong>
                      </p>
                    </div>
                    <div>
                      <p className="c-white">{time.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-info">
              <p className="c-white" style={{ fontSize: "1.5vw" }}>Phone / Whatsapp</p>
              <h3 className="phone-number c-white">0321-4994240</h3>
              <button className="appointment-button" onClick={openModal}>
                GET APPOINTMENT
              </button>
            </div>
          </div>

          {/* Second Column - Doctor Image */}
          <div className="column doctor-image-container" style={{ flex: "1" }}>
            <img src={doctorImage} alt="Doctor" className="doctor-image" />
          </div>

          {/* Third Column - Doctor Info */}
          <div className="column doctor-info-container" style={{ flex: "1" }}>
            <p className="intro-title">INTRODUCTION</p>
            <h2>Your Experienced Specialist</h2>
            <p>{doctor.doctorIntroduction}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkingHours;
