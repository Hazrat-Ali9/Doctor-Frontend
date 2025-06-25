// src/pages/AdminAbout.js
import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // Importing a trash icon

const AdminAbout = () => {
    const [aboutInfo, setAboutInfo] = useState({
        image: null, // Change to null for image file handling
        name: '',
        heading: '',
        experience: [{ title: '', startDate: '', endDate: '', description: '' }],
        aboutMe: '',
        education: [{ school: '', country: '', degree: '', startDate: '', endDate: '' }],
        services: [''],
        specialization: [''],
        languages: [''],
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAboutInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle file input for image
    const handleImageChange = (e) => {
        setAboutInfo((prevState) => ({ ...prevState, image: e.target.files[0] }));
    };

    // Handle adding new fields
    const addExperience = () => {
        setAboutInfo((prevState) => ({
            ...prevState,
            experience: [...prevState.experience, { title: '', startDate: '', endDate: '', description: '' }],
        }));
    };

    const addEducation = () => {
        setAboutInfo((prevState) => ({
            ...prevState,
            education: [...prevState.education, { school: '', country: '', degree: '', startDate: '', endDate: '' }],
        }));
    };

    const addService = () => {
        setAboutInfo((prevState) => ({
            ...prevState,
            services: [...prevState.services, ''],
        }));
    };

    const addSpecialization = () => {
        setAboutInfo((prevState) => ({
            ...prevState,
            specialization: [...prevState.specialization, ''],
        }));
    };

    const addLanguage = () => {
        setAboutInfo((prevState) => ({
            ...prevState,
            languages: [...prevState.languages, ''],
        }));
    };

    const removeExperience = (index) => {
        setAboutInfo((prevState) => ({
            ...prevState,
            experience: prevState.experience.filter((_, i) => i !== index),
        }));
    };

    const removeEducation = (index) => {
        setAboutInfo((prevState) => ({
            ...prevState,
            education: prevState.education.filter((_, i) => i !== index),
        }));
    };

    const removeService = (index) => {
        setAboutInfo((prevState) => ({
            ...prevState,
            services: prevState.services.filter((_, i) => i !== index),
        }));
    };

    const removeSpecialization = (index) => {
        setAboutInfo((prevState) => ({
            ...prevState,
            specialization: prevState.specialization.filter((_, i) => i !== index),
        }));
    };

    const removeLanguage = (index) => {
        setAboutInfo((prevState) => ({
            ...prevState,
            languages: prevState.languages.filter((_, i) => i !== index),
        }));
    };

    // Handle input change for arrays
    const handleArrayChange = (e, index, field) => {
        const { value } = e.target;
        setAboutInfo((prevState) => {
            const updatedArray = [...prevState[field]];
            updatedArray[index] = value;
            return { ...prevState, [field]: updatedArray };
        });
    };

    const handleExperienceChange = (e, index, field) => {
        const { name, value } = e.target;
        setAboutInfo((prevState) => {
            const updatedExperience = [...prevState.experience];
            updatedExperience[index] = { ...updatedExperience[index], [name]: value };
            return { ...prevState, experience: updatedExperience };
        });
    };

    const handleEducationChange = (e, index, field) => {
        const { name, value } = e.target;
        setAboutInfo((prevState) => {
            const updatedEducation = [...prevState.education];
            updatedEducation[index] = { ...updatedEducation[index], [name]: value };
            return { ...prevState, education: updatedEducation };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call to save aboutInfo
        console.log(aboutInfo);
    };

    return (
        <div className="container mt-4">
            <h2>Edit About Info</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Group>

                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={aboutInfo.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formHeading">
                    <Form.Label>Heading</Form.Label>
                    <Form.Control type="text" name="heading" value={aboutInfo.heading} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formAboutMe">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control as="textarea" rows={3} name="aboutMe" value={aboutInfo.aboutMe} onChange={handleChange} />
                </Form.Group>

                <h4>Experience</h4>
                {aboutInfo.experience.map((exp, index) => (
                    <div key={index} className="mb-3 d-flex align-items-start">
                        <div className="flex-grow-1">
                            <Form.Group controlId={`formExperienceTitle${index}`}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={exp.title}
                                    onChange={(e) => handleExperienceChange(e, index, 'title')}
                                />
                            </Form.Group>
                            <Form.Group controlId={`formExperienceStartDate${index}`}>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={exp.startDate}
                                    onChange={(e) => handleExperienceChange(e, index, 'startDate')}
                                />
                            </Form.Group>
                            <Form.Group controlId={`formExperienceEndDate${index}`}>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={exp.endDate}
                                    onChange={(e) => handleExperienceChange(e, index, 'endDate')}
                                />
                            </Form.Group>
                        </div>
                        <Button variant="danger" className="ms-2" onClick={() => removeExperience(index)}>
                            <FaTrash />
                        </Button>
                    </div>
                ))}
                <Button variant="primary" onClick={addExperience}>
                    + Add Experience
                </Button>

                <h4>Education</h4>
                {aboutInfo.education.map((edu, index) => (
                    <div key={index} className="mb-3 d-flex align-items-start">
                        <div className="flex-grow-1">
                            <Form.Group controlId={`formEducationSchool${index}`}>
                                <Form.Label>School/College/University</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="school"
                                    value={edu.school}
                                    onChange={(e) => handleEducationChange(e, index, 'school')}
                                />
                            </Form.Group>
                            <Form.Group controlId={`formEducationCountry${index}`}>
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={edu.country}
                                    onChange={(e) => handleEducationChange(e, index, 'country')}
                                />
                            </Form.Group>
                            <Form.Group controlId={`formEducationDegree${index}`}>
                                <Form.Label>Degree</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="degree"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(e, index, 'degree')}
                                />
                            </Form.Group>
                            <Form.Group controlId={`formEducationStartDate${index}`}>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={edu.startDate}
                                    onChange={(e) => handleEducationChange(e, index, 'startDate')}
                                />
                            </Form.Group>
                            <Form.Group controlId={`formEducationEndDate${index}`}>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={edu.endDate}
                                    onChange={(e) => handleEducationChange(e, index, 'endDate')}
                                />
                            </Form.Group>
                        </div>
                        <Button variant="danger" className="ms-2" onClick={() => removeEducation(index)}>
                            <FaTrash />
                        </Button>
                    </div>
                ))}
                <Button variant="primary" onClick={addEducation}>
                    + Add Education
                </Button>

                <h4>Services</h4>
                {aboutInfo.services.map((service, index) => (
                    <div key={index} className="mb-3 d-flex align-items-start">
                        <div className="flex-grow-1">
                            <Form.Group controlId={`formService${index}`}>
                                <Form.Label>Service</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={service}
                                    onChange={(e) => handleArrayChange(e, index, 'services')}
                                />
                            </Form.Group>
                        </div>
                        <Button variant="danger" className="ms-2" onClick={() => removeService(index)}>
                            <FaTrash />
                        </Button>
                    </div>
                ))}
                <Button variant="primary" onClick={addService}>
                    + Add Service
                </Button>

                <h4>Specialization</h4>
                {aboutInfo.specialization.map((spec, index) => (
                    <div key={index} className="mb-3 d-flex align-items-start">
                        <div className="flex-grow-1">
                            <Form.Group controlId={`formSpecialization${index}`}>
                                <Form.Label>Specialization</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={spec}
                                    onChange={(e) => handleArrayChange(e, index, 'specialization')}
                                />
                            </Form.Group>
                        </div>
                        <Button variant="danger" className="ms-2" onClick={() => removeSpecialization(index)}>
                            <FaTrash />
                        </Button>
                    </div>
                ))}
                <Button variant="primary" onClick={addSpecialization}>
                    + Add Specialization
                </Button>

                <h4>Languages</h4>
                {aboutInfo.languages.map((lang, index) => (
                    <div key={index} className="mb-3 d-flex align-items-start">
                        <div className="flex-grow-1">
                            <Form.Group controlId={`formLanguage${index}`}>
                                <Form.Label>Language</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lang}
                                    onChange={(e) => handleArrayChange(e, index, 'languages')}
                                />
                            </Form.Group>
                        </div>
                        <Button variant="danger" className="ms-2" onClick={() => removeLanguage(index)}>
                            <FaTrash />
                        </Button>
                    </div>
                ))}
                <Button variant="primary" onClick={addLanguage}>
                    + Add Language
                </Button>
                <br /><br />
                <Button variant="success" type="submit" className="mt-3">
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default AdminAbout;
