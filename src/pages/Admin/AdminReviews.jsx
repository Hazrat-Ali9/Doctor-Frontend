import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome icon
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the trash icon
import '../../css/AdminReviews.css'; // Optional: for custom styling
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const {API} = useContext(AppContext);
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API}/reviews/`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  useEffect(() => {
   

    fetchReviews();
  }, []);

  // Function to handle deletion of a review
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/reviews/${id}`);      
      toast.success(response.data.message);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Patient Reviews</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Patient Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Rating</th>
              <th scope="col">Message</th>
              <th scope="col">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.patientName}</td>
                  <td>{new Date(review.date).toLocaleDateString()}</td>
                  <td>{review.time}</td>
                  <td>{review.rating}</td>
                  <td>{review.message}</td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDelete(review._id)} // Call delete function
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Trash icon */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewTable;
