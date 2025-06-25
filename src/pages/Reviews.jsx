import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaStar } from "react-icons/fa";
import "../css/Reviews.css";
import {format} from 'date-fns';
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const {API} = useContext(AppContext);
  // Fetch reviews from API when component mounts
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API}/reviews/`);
      setReviews(response.data.reviews); // Assuming the API response is an array of reviews
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    

    fetchReviews();
  }, []);

  const formik = useFormik({
    initialValues: {
      patientName: "",  // changed from "name" to "patientName"
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      rating: 0,
      message: "",
    },
    validationSchema: Yup.object({
      patientName: Yup.string().required("Name is required"),
      date: Yup.string().required("Date is required"),
      time: Yup.string().required("Time is required"),
      rating: Yup.number().min(1, "Please provide a rating").required("Rating is required"),
      message: Yup.string().min(20, "Message must be at least 20 characters").required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${API}/reviews/`, values);
        toast.success(response.data.message);
        resetForm();
        fetchReviews();

      } catch (error) {
        console.error("Error adding review:", error);
      }
    },
  });

  const handleStarClick = (index) => {
    formik.setFieldValue("rating", index + 1);
  };

  return (
    <div className="reviews-container c-width-1 m-auto">
      <div className="review-form">
        <h2>Submit a Review</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Patient Name</label>
            <input
              id="patientName"
              name="patientName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.patientName}
              className={formik.touched.patientName && formik.errors.patientName ? "input-error" : ""}
            />
            {formik.touched.patientName && formik.errors.patientName && (
              <div className="error-message">{formik.errors.patientName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              className={formik.touched.date && formik.errors.date ? "input-error" : ""}
            />
            {formik.touched.date && formik.errors.date && (
              <div className="error-message">{formik.errors.date}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.time}
              className={formik.touched.time && formik.errors.time ? "input-error" : ""}
            />
            {formik.touched.time && formik.errors.time && (
              <div className="error-message">{formik.errors.time}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleStarClick(index)}
                  className={index < formik.values.rating ? "star-filled" : "star-empty"}
                />
              ))}
            </div>
            {formik.touched.rating && formik.errors.rating && (
              <div className="error-message">{formik.errors.rating}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className={formik.touched.message && formik.errors.message ? "input-error" : ""}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="error-message">{formik.errors.message}</div>
            )}
          </div>

          <button type="submit" className="submit-button">
            Submit Review
          </button>
        </form>
      </div>

      <div className="reviews-list com-margin" style={{ marginBottom: "5vw" }}>
      {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <h3>{review.patientName}</h3>
            <h4>PATIENT</h4>
            <p>
              {review.date ? format(new Date(review.date), 'MMMM dd, yyyy') : 'Unknown Date'} - 
              {review.time || 'Unknown Time'}
            </p>
            <p>{review.message}</p>
            <div className="rating">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} size={20} color="#ffc107" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
