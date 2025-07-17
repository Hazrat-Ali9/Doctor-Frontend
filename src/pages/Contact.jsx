import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../css/Contact.css"; // Import your CSS file
import { FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { contactFormSubmission } from "../services/contactServices";
// Contact
const Contact = () => {
  const { openModal } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Name must be at least 5 characters long")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .matches(/@.*\.com$/, "Email must include @ and .com")
        .required("Email is required"),
      phone: Yup.string()
        .length(11, "Phone: 0300XXXXXXX")
        .required("Phone is required"),
      message: Yup.string()
        .min(20, "Message must be at least 20 characters long")
        .required("Message is required"),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      try {
        const response=await contactFormSubmission(JSON.stringify({
          name:formik.values.name,
          email:formik.values.email,
          phone:formik.values.phone,
          message:formik.values.message,
        }))
        if (response.status == 200) {

        console.log(response.data)
      }
     } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <div className="c-width-1 d-flex justify-content-between align-content-lg-start com-margin">
      <div className="info-column">
        <div className="info-header">
          <h2>GET IN TOUCH!</h2>
          <p>
            
dr. Zubair Cheema! If you have any questions or would like to book an appointment, please fill in the contact form. We will get back to you as soon as possible.
<br />
Contact us page is essential and helpful to patient as it allows patient to contact their doctor dr. Zubair Cheema easily.
<br />
They also give you the opportunity to capture leads and improve their service.
<br />
Generally, patient can also leave feedback or ask questions through these channels. You’ll receive valuable information about your patient’ preferences and expectations if done correctly.
<br />
Dr. Zubair is one of the best urologist in Pakistan having 21 year of experience in urology and practicing in Saleem Memorial Hospital.  His field of interest  includes Endourology And Laser Surgery, Enlarge Prostate Diagnostic, Erectile Dysfunction, Kidney Diseases, Kidney Failure, Nephrectomy, Penile Implants, Percutaneous Nephrolithotomy(PCNL), Prostatectomy, Pyelolithotomy, Radical Proctectomy, Venereology, Bladder/Kidney Tumor Surgery, Infertility, Male Sexual Health, Prostate Diseases, Stone Diseases, Stones Of Urinary Tract.

          </p>
        </div>
        <div className="info-columns">
          <div className="info-column">
            <h3>
              <FaMapMarkerAlt className="icon" style={{marginRight: "1vw"}}/> Location
            </h3>
            <p>123 Main St, City, Country</p>
            <h3>
              <FaPhone className="icon" style={{marginRight: "1vw"}}/> Contact Number
            </h3>
            <p>+123 456 7890</p>
          </div>
          <div className="info-column">
            <h3>
              <FaClock className="icon" style={{marginRight: "1vw"}}/> Working Hours
            </h3>
            <p>Mon-Fri: 9 AM - 5 PM</p>
            <p>Sat: 10 AM - 2 PM</p>
            <button className="book-appointment" onClick={openModal}>Book Appointment</button>
          </div>
        </div>
      </div>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form onSubmit={formik.handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={
                formik.touched.name && formik.errors.name ? "input-error" : ""
              }
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email ? "input-error" : ""
              }
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={
                formik.touched.phone && formik.errors.phone ? "input-error" : ""
              }
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error-message">{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className={
                formik.touched.message && formik.errors.message
                  ? "input-error"
                  : ""
              }
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="error-message">{formik.errors.message}</div>
            ) : null}
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
