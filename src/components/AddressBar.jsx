import React, { useContext } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
// Adress Bar
const AddressBar = () => {
  const data = useContext(AppContext);
  const {setting} = data;
  return (
    <React.Fragment>
      <div className="bg-light">
        <div className="d-flex justify-space-between align-content-center c-width-1 m-auto p-3">
          <div className="d-flex align-content-center justify-content-center">
            <ImLocation2 style={{fontSize: "1.5vw"}} />
            <h2 style={{fontSize: '1.5vw', marginLeft: "0.4vw", fontWeight: 'bold'}}>
              {setting.location}
            </h2>
          </div>
          <div style={{width: "4vw"}} className="d-flex align-items-center justify-space-between">
            <Link to="https://www.facebook.com" target="_blank"><FaFacebook className="font-1-5"/></Link>
            <Link to="https://www.instagram.com" target="_blank"><FaInstagram className="font-1-5" /></Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressBar;
