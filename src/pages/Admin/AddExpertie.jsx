import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';

const AddExpertie = () => {
  const [title, setTitle] = useState('');
  const [bulletPoints, setBulletPoints] = useState(['']);
  const navigate = useNavigate();
  const {API} = useContext(AppContext);
  const handleAddBulletPoint = () => setBulletPoints([...bulletPoints, '']);
  const handleBulletPointChange = (index, value) => {
    const updatedPoints = [...bulletPoints];
    updatedPoints[index] = value;
    setBulletPoints(updatedPoints);
  };

  const handleRemoveBulletPoint = (index) => {
    setBulletPoints(bulletPoints.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/expertise/add`, {
        title,
        bulletPoints: bulletPoints.filter(point => point.trim()),
      });
      navigate('/admin/experties');
    } catch (error) {
      console.error('Error adding expertise:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <div className="card shadow-lg p-4" style={{ width: '70%' }}>
        <h2 className="card-title text-center mb-4">Add New Expertise</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Bullet Points</label>
            {bulletPoints.map((point, index) => (
              <div key={index} className="input-group my-2">
                <input
                  type="text"
                  className="form-control"
                  value={point}
                  onChange={(e) => handleBulletPointChange(index, e.target.value)}
                />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveBulletPoint(index)}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={handleAddBulletPoint}>Add Point</button>
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-10">Add Expertise</button>
          <button type="submit" className="btn btn-secondary mt-3 w-10" style={{marginLeft: "1vw"}} onClick={()=> navigate('/admin/experties')}>Back</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpertie;
