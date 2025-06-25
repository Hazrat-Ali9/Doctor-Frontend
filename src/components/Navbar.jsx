import { Link, useLocation } from 'react-router-dom';
import '../css/NavBar.css'; 
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openModal } = useContext(AppContext);

    const Links = [
        {title: "Home", path: "/"},
        {title: "About", path: "/about"},
        {title: "Expertise", path: "/expertise"},
        {title: "Reviews", path: "/reviews"},
        {title: "Contact", path: "/contact"},
    ]

    const location = useLocation();
    console.log(location.pathname);

  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        {Links.map((link, index)=>(
            <li key={index}><Link to={link.path} style={{fontWeight: location.pathname === link.path ? "bold" : "normal"}}>{link.title}</Link></li>
        ))}
        
      </ul>
      <div className="appointment-btn">
        <button className="btn-outline" onClick={openModal}>GET APPOINTMENT</button>
      </div>
    </nav>
  );
}

export default Navbar;
