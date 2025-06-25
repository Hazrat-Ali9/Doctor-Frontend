// src/AppContext.js
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    const [reviews, setReview] = useState('');
    const [appointments, setAppointments] = useState('');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const API = "http://localhost:5000/api";

    const [bio, setBio] = useState({
      image: '',
      name: '',
      heading: '',
      experience: [],
      aboutMe: '',
      education: [],
      services: [],
      specialization: [],
      languagesSpoken: [],
      professionalBackground: ''
    });


    const [setting, setSetting] = useState([]);
    const fetchSetting = async () => {
        try {
          const response = await axios.get(`${API}/settings/`);
          setSetting(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching bio:", error);
        }
      };
      const fetchBio = async () => {
        try {
          const response = await axios.get(`${API}/bio`);
          setBio(response.data);
        } catch (error) {
          console.error("Error fetching bio:", error);
        }
      };

      const fetchReviews = async ()=>{
        try {
          const response = await axios.get(`${API}/reviews/`);
          setReview(response.data)
        } catch (error) {
          console.log("Error fetching reviews:", error);
        }
      }


      const fetchAppointment = async ()=>{
        try {
          const response = await axios.get(`${API}/appointments/`);
          setAppointments(response.data)
          
        } catch (error) {
          console.log("Failed to fetch appointment")
        }
      }
    useEffect(() => {
        fetchSetting();
        fetchBio();
        fetchReviews();
        fetchAppointment();
    }, [])
    

    return (
        <AppContext.Provider value={{ isModalOpen, openModal, closeModal, email, setEmail, password, setPassword, setting, bio, setBio, reviews, appointments, API }}>
            {children}
        </AppContext.Provider>
    );
};
