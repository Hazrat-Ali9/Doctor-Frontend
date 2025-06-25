import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../../css/AdminSettings.css";
import { AppContext } from "../../context/AppContext";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    hospitalTiming: [],
    closedDays: [],
    contactNumber: '',
    email: '',
    location: '',
    footerText: ''
  });
  const {API} = useContext(AppContext);
  // Function to convert 12-hour time to 24-hour time
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (modifier === "AM" && hours === "12") {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${minutes}`;
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API}/settings`);
      // Convert hospital timing times to 24-hour format
      const formattedTiming = response.data.hospitalTiming.map(timing => ({
        ...timing,
        openTime: convertTo24Hour(timing.openTime), // Convert to 24-hour format
        closeTime: convertTo24Hour(timing.closeTime) // Convert to 24-hour format
      }));
      setSettings({
        ...response.data,
        hospitalTiming: formattedTiming
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hospitalTiming: settings.hospitalTiming.map(timing => ({
        ...timing,
        openTime: timing.openTime || '',
        closeTime: timing.closeTime || ''
      })),
      closedDays: settings.closedDays,
      contactNumber: settings.contactNumber,
      email: settings.email,
      location: settings.location,
      footerText: settings.footerText,
    },
    validationSchema: Yup.object({
      contactNumber: Yup.string().required("Contact number is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      location: Yup.string().required("Location is required"),
      footerText: Yup.string().required("Footer text is required"),
    }),
    onSubmit: async (values) => {
      try {
        const updatedSettings = {
          ...values,
          hospitalTiming: values.hospitalTiming.map(timing => ({
            ...timing,
            openTime: timing.openTime,
            closeTime: timing.closeTime
          }))
        };
        const response = await axios.put(`${API}/settings/`, updatedSettings);
        console.log("Settings updated successfully:", response.data);
        fetchSettings();
      } catch (error) {
        console.error("Error updating settings:", error);
      }
    },
  });

  const handleAddTiming = () => {
    const newHospitalTiming = [...formik.values.hospitalTiming, { day: "", openTime: "", closeTime: "" }];
    formik.setFieldValue("hospitalTiming", newHospitalTiming);
  };

  const handleRemoveTiming = (index) => {
    const newHospitalTiming = formik.values.hospitalTiming.filter((_, i) => i !== index);
    formik.setFieldValue("hospitalTiming", newHospitalTiming);
  };

  const handleClosedDaysChange = (e) => {
    const { value } = e.target;
    const updatedClosedDays = formik.values.closedDays.includes(value)
      ? formik.values.closedDays.filter(day => day !== value)
      : [...formik.values.closedDays, value];
    formik.setFieldValue("closedDays", updatedClosedDays);
  };

  return (
    <div className="admin-settings-container">
      <div className="settings-form">
        <h2>Hospital Settings</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Contact Number */}
          <div className="form-group">
            <label htmlFor="contactNumber">
              <FaPhoneAlt /> Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              className={`form-control ${formik.touched.contactNumber && formik.errors.contactNumber ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNumber}
            />
            {formik.touched.contactNumber && formik.errors.contactNumber && (
              <div className="invalid-feedback">{formik.errors.contactNumber}</div>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">
              <FaMapMarkerAlt /> Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className={`form-control ${formik.touched.location && formik.errors.location ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location && (
              <div className="invalid-feedback">{formik.errors.location}</div>
            )}
          </div>

          {/* Footer Text */}
          <div className="form-group">
            <label htmlFor="footerText">Footer Text</label>
            <textarea
              id="footerText"
              name="footerText"
              className={`form-control ${formik.touched.footerText && formik.errors.footerText ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.footerText}
            ></textarea>
            {formik.touched.footerText && formik.errors.footerText && (
              <div className="invalid-feedback">{formik.errors.footerText}</div>
            )}
          </div>

          {/* Hospital Timing */}
          <div className="form-group">
            <label>Hospital Timing</label>
            {formik.values.hospitalTiming.map((timing, index) => (
              <div key={index} className="timing-row d-flex justify-content-between">
                <input
                  type="text"
                  placeholder="Day"
                  name={`hospitalTiming[${index}].day`}
                  className="form-control flex-grow-1 mx-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={timing.day}
                />
                <input
                  type="time"
                  name={`hospitalTiming[${index}].openTime`}
                  className="form-control flex-grow-1 mx-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={timing.openTime}
                />
                <input
                  type="time"
                  name={`hospitalTiming[${index}].closeTime`}
                  className="form-control flex-grow-1 mx-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={timing.closeTime}
                />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveTiming(index)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={handleAddTiming}>Add Timing</button>
          </div>

          {/* Closed Days */}
          <div className="form-group">
            <label>Closed Days</label>
            <div>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                <div key={day} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    id={day}
                    name="closedDays"
                    value={day}
                    className="form-check-input"
                    checked={formik.values.closedDays.includes(day)}
                    onChange={handleClosedDaysChange}
                  />
                  <label className="form-check-label" htmlFor={day}>
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
