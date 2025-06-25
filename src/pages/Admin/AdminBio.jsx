import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../css/AdminBio.css";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const AdminBio = () => {
  
  const {bio, API} = useContext(AppContext);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: bio.image,
      name: bio.name,
      heading: bio.heading,
      experience: bio.experience,
      aboutMe: bio.aboutMe,
      education: bio.education,
      services: bio.services,
      specialization: bio.specialization,
      languagesSpoken: bio.languagesSpoken,
      professionalBackground: bio.professionalBackground,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      heading: Yup.string().required("Heading is required"),
      experience: Yup.array().min(1, "At least one experience is required"),
      aboutMe: Yup.string().required("About Me is required"),
      education: Yup.array().min(1, "At least one education entry is required"),
      services: Yup.array().min(1, "At least one service is required"),
      specialization: Yup.array().min(1, "At least one specialization is required"),
      languagesSpoken: Yup.array().min(1, "At least one language is required"),
      professionalBackground: Yup.string().required("Professional Background is required")
    }),
    onSubmit: async (values) => {
      try {
        const updatedBio = { ...values };
        const response = await axios.put(`${API}/bio/`, updatedBio);
        if(response.ok){
          toast.success("Profile Updated Successful!");
        }
      } catch (error) {
        toast.error("Error updating bio");
      }
    },
  });

  const handleAddExperience = () => {
    const newExperience = [...formik.values.experience, { startYear: "", endYear: "", description: "" }];
    formik.setFieldValue("experience", newExperience);
  };

  const handleRemoveExperience = (index) => {
    const newExperience = formik.values.experience.filter((_, i) => i !== index);
    formik.setFieldValue("experience", newExperience);
  };

  const handleAddEducation = () => {
    const newEducation = [...formik.values.education, { degree: "", duration: "", university: "" }];
    formik.setFieldValue("education", newEducation);
  };

  const handleRemoveEducation = (index) => {
    const newEducation = formik.values.education.filter((_, i) => i !== index);
    formik.setFieldValue("education", newEducation);
  };

  const handleAddService = () => {
    const newServices = [...formik.values.services, ""];
    formik.setFieldValue("services", newServices);
  };

  const handleRemoveService = (index) => {
    const newServices = formik.values.services.filter((_, i) => i !== index);
    formik.setFieldValue("services", newServices);
  };

  const handleAddSpecialization = () => {
    const newSpecialization = [...formik.values.specialization, ""];
    formik.setFieldValue("specialization", newSpecialization);
  };

  const handleRemoveSpecialization = (index) => {
    const newSpecialization = formik.values.specialization.filter((_, i) => i !== index);
    formik.setFieldValue("specialization", newSpecialization);
  };

  const handleAddLanguage = () => {
    const newLanguages = [...formik.values.languagesSpoken, ""];
    formik.setFieldValue("languagesSpoken", newLanguages);
  };

  const handleRemoveLanguage = (index) => {
    const newLanguages = formik.values.languagesSpoken.filter((_, i) => i !== index);
    formik.setFieldValue("languagesSpoken", newLanguages);
  };

  return (
    <div className="admin-bio-container">
      <div className="bio-form">
        <h2>Admin Bio</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Image */}
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="image"
              name="image"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.image}
            />
          </div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>

          {/* Heading */}
          <div className="form-group">
            <label htmlFor="heading">Heading</label>
            <input
              type="text"
              id="heading"
              name="heading"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.heading}
            />
          </div>

          {/* Experience */}
          <div className="form-group">
            <label>Experience</label>
            {formik.values.experience.map((exp, index) => (
              <div key={index} className="experience-row">
                <input
                  type="text"
                  placeholder="Start Year"
                  name={`experience[${index}].startYear`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={exp.startYear}
                />
                <input
                  type="text"
                  placeholder="End Year"
                  name={`experience[${index}].endYear`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={exp.endYear}
                />
                <input
                  type="text"
                  placeholder="Description"
                  name={`experience[${index}].description`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={exp.description}
                />
                <button type="button" onClick={() => handleRemoveExperience(index)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddExperience}>Add Experience</button>
          </div>

          {/* Education */}
          <div className="form-group">
            <label>Education</label>
            {formik.values.education.map((edu, index) => (
              <div key={index} className="education-row">
                <input
                  type="text"
                  placeholder="Degree"
                  name={`education[${index}].degree`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={edu.degree}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  name={`education[${index}].duration`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={edu.duration}
                />
                <input
                  type="text"
                  placeholder="University"
                  name={`education[${index}].university`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={edu.university}
                />
                <button type="button" onClick={() => handleRemoveEducation(index)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddEducation}>Add Education</button>
          </div>

          {/* Services */}
          <div className="form-group">
            <label>Services</label>
            {formik.values.services.map((service, index) => (
              <div key={index} className="service-row">
                <input
                  type="text"
                  placeholder="Service"
                  name={`services[${index}]`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={service}
                />
                <button type="button" onClick={() => handleRemoveService(index)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddService}>Add Service</button>
          </div>

          {/* Specialization */}
          <div className="form-group">
            <label>Specialization</label>
            {formik.values.specialization.map((spec, index) => (
              <div key={index} className="specialization-row">
                <input
                  type="text"
                  placeholder="Specialization"
                  name={`specialization[${index}]`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={spec}
                />
                <button type="button" onClick={() => handleRemoveSpecialization(index)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddSpecialization}>Add Specialization</button>
          </div>

          {/* Languages Spoken */}
          <div className="form-group">
            <label>Languages Spoken</label>
            {formik.values.languagesSpoken.map((language, index) => (
              <div key={index} className="language-row">
                <input
                  type="text"
                  placeholder="Language"
                  name={`languagesSpoken[${index}]`}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={language}
                />
                <button type="button" onClick={() => handleRemoveLanguage(index)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddLanguage}>Add Language</button>
          </div>

          {/* Professional Background */}
          <div className="form-group">
            <label htmlFor="professionalBackground">Professional Background</label>
            <textarea
              id="professionalBackground"
              name="professionalBackground"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.professionalBackground}
            />
          </div>

          <button type="submit" className="btn btn-primary">Update Bio</button>
        </form>
      </div>
    </div>
  );
};

export default AdminBio;
