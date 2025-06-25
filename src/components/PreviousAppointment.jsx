import React from "react";
import "../css/PreviousAppointments.css"; // Import your CSS file

const previousAppointmentsData = [
  {
    id: 1,
    title: "Consultation with Dr. Zubair",
    description: "Follow-up consultation regarding your recent tests.",
    imageUrl: "https://d3313lwq5y3sh2.cloudfront.net/assets/photos/000/161/123/original/327072_5874551_akhbar.jpg?1607065256", // Replace with your image path
  },
  {
    id: 2,
    title: "Routine Checkup",
    description: "Annual checkup and health assessment.",
    imageUrl: "https://d3313lwq5y3sh2.cloudfront.net/assets/photos/000/161/123/original/327072_5874551_akhbar.jpg?1607065256", // Replace with your image path
  },
  {
    id: 3,
    title: "Kidney Stone Treatment",
    description: "Treatment plan for kidney stone management.",
    imageUrl: "https://d3313lwq5y3sh2.cloudfront.net/assets/photos/000/161/123/original/327072_5874551_akhbar.jpg?1607065256", // Replace with your image path
  },
  {
    id: 4,
    title: "Urology Screening",
    description: "Screening for urological health.",
    imageUrl: "https://d3313lwq5y3sh2.cloudfront.net/assets/photos/000/161/123/original/327072_5874551_akhbar.jpg?1607065256", // Replace with your image path
  },
];

const PreviousAppointments = () => {
  return (
    <div className="c-width-full previous-appointments-container com-margin com-bg" style={{padding: "5vw 0"}}>
      <div className="c-width-1 m-auto">
        <h2 className="text-center">Health Facility</h2>
        <h1 className="appointments-title" style={{marginBottom: "5vw"}}>Previous Appointments</h1>
        <div className="appointments-grid">
            {previousAppointmentsData.map((appointment) => (
            <div key={appointment.id} className="appointment-card" style={{padding: "1vw"}}>
                <div className="card-image-container">
                <img src={appointment.imageUrl} alt={appointment.title} className="appointment-image" />
                </div>
                <div className="card-text-container">
                <h3 className="appointment-title">{appointment.title}</h3>
                <p className="appointment-description">{appointment.description}</p>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousAppointments;
