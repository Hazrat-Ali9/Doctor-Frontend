import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const AdminExperties = () => {
  const [expertiseList, setExpertiseList] = useState([]);
  const navigate = useNavigate();
  const {API} = useContext(AppContext);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const response = await axios.get(`${API}/expertise/`);
        setExpertiseList(response.data);
      } catch (error) {
        console.error('Error fetching expertise:', error);
      }
    };
    fetchExpertise();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/expertise/${id}`);
      setExpertiseList(expertiseList.filter(expertise => expertise._id !== id));
    } catch (error) {
      console.error('Error deleting expertise:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Expertise Management</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/experties/add')}>Add Expertise</button>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expertiseList.map((expertise) => (
            <tr key={expertise._id}>
              <td>{expertise.title}</td>
              <td>
                <ul>
                  {expertise.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="btn btn-warning mx-1" onClick={() => navigate(`/admin/experties/${expertise._id}`)}>Update</button>
                <button className="btn btn-danger mx-1" onClick={() => handleDelete(expertise._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExperties;
