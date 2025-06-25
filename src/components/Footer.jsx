import { useContext } from 'react';
import '../css/Footer.css';
import { AppContext } from '../context/AppContext';
import logo from "../assets/images/Logo1.png";
import { IoCall } from 'react-icons/io5';
import { ImLocation2 } from 'react-icons/im';
import { IoMdMail } from 'react-icons/io';
const services = [
  "Anger Management",
  "Anxiety Disorders Treatment",
  "Autism Treatment",
  "Career Counselling",
  "Intellectual Disabilities",
];

const contactInfo = {
  email: "contact@example.com",
  phone: "0321-4994240",
  location: "WAPDA Town, Lahore, Punjab, Pakistan",
};

const Footer = () => {
  const { openModal } = useContext(AppContext);
  const data = useContext(AppContext);
  const {setting} = data;
  return (
    <footer className="footer">
      <div className="footer-container c-width-1">
        <h2 className="footer-heading">Book Your Appointment To Get Quality Services From Us!</h2>
        <button className="appointment-button" onClick={openModal}>Get Appointment</button>
      </div>

      <div className="footer-info c-width-1 m-auto">
        <div className="footer-column logo-column">
          <img src={logo} alt="Logo" className="footer-logo m-auto" /> {/* Replace with actual logo path */}
          <p className="about-us">{setting.footerText}</p>
        </div>
        <div className="footer-column services-column">
          <h3>Our Services</h3>
          <ul>
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="footer-column contact-column">
          <h3>Contact Us</h3>
          <div className='d-flex'><IoMdMail style={{fontSize: "1.5vw", marginRight: "0.5vw"}} /><p style={{color: "#fff"}}>Email: {setting.email}</p></div>
          <div className='d-flex'><IoCall style={{fontSize: "1.5vw", marginRight: "0.5vw"}} /><p style={{color: "#fff"}}>Phone: {setting.contactNumber}</p></div>
          <div className='d-flex'><ImLocation2 style={{fontSize: "1.5vw", marginRight: "0.5vw"}} /><p style={{color: "#fff"}}>Location: {setting.location}</p></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
