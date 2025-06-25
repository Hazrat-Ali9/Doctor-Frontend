import React from "react";
import Cards1 from "../components/Cards1";
import WorkingHours from "../components/WorkingHours";
import PreviousAppointments from "../components/PreviousAppointment";
import Map from "../components/Map";

const Home = () => {
  return (
    <React.Fragment>
        <div style={{padding: '2rem 0' }} className="d-flex justify-space-between align-items-center c-width-1 com-margin">
          <div style={{ marginBottom: '1rem', color: '#1f3a6f', flex: "2 0 0" }}>
            <h5>DR ZUBAIR'S Urologist</h5>
            <h1>PRINCIPLES OF PRACTICE</h1>
          </div>
          <div style={{ textAlign: 'justify', color: '#333', flex: "2" }}>
            <p style={{fontSize: "1rem"}}>
              Treat patients with respect and dignity, all while carefully listening to all 
              their concerns and questions. Consequently, ensure to clearly explain the diagnosis 
              and treatment, and be available for advice in emergency situations.
            </p>
          </div>
        </div>

        <Cards1 />

        <WorkingHours />
        <PreviousAppointments />
        <Map />
    </React.Fragment>
  );
};
export default Home