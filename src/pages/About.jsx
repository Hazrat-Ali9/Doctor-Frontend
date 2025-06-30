import React, { useContext, useEffect, useState } from 'react';
import '../css/About.css'; // Import your CSS file
import Pic from "../assets/images/myPic.jpg"; // Update this if the image is dynamic
import { AppContext } from '../context/AppContext';
// about
const About = () => {
  const [bioData, setBioData] = useState(null);
  const {API} = useContext(AppContext);
  // Fetch Bio data from API
  useEffect(() => {
    const fetchBioData = async () => {
      try {
        const response = await fetch(`${API}/bio`); // Adjust the API endpoint as needed
        const data = await response.json();
        setBioData(data); // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching bio data:', error);
      }
    };

    fetchBioData();
  }, []);

  // Return a loading message while data is being fetched
  if (!bioData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-container">
      <section className="about-header c-width-1 m-auto">
        <img src={bioData.image || Pic} alt="Doctor" className="doctor-image" />
        <div className="doctor-info">
          <h1 className="doctor-name">{bioData.name}</h1>
          <h2 className="doctor-heading">{bioData.heading}</h2>
        </div>
      </section>

      <section className="about-me-section c-width-1 m-auto">
        <h3>About Me</h3>
        <p>{bioData.aboutMe}</p>
      </section>

      <div className='d-flex justify-content-between align-items-start c-width-1 m-auto'>
        <section className="services-section">
          <h3>Services</h3>
          <ul className="services-list">
            {bioData.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </section>

        <section className="education-section">
          <h3>Education</h3>
          {bioData.education.map((edu, index) => (
            <div className="education-item" key={index}>
              <p>{edu.degree}</p>
              <p>Duration: {edu.duration}</p>
              <p>University: {edu.university}</p>
            </div>
          ))}
        </section>
      </div>

      <div className='d-flex justify-content-between align-items-start c-width-1 m-auto'>
        <section className="specialization-section">
          <h3>Specialization</h3>
          <ul>
            {bioData.specialization.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </section>

        <section className="languages-section">
          <h3>Languages Spoken</h3>
          <ul>
            {bioData.languagesSpoken.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="experience-section c-width-1 m-auto">
        <h3>Experience</h3>
        <ul className="experience-list">
          {bioData.experience.map((exp, index) => (
            <li key={index}>
              <p>{exp.startYear} - {exp.endYear}: {exp.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default About;
