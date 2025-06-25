import "../css/Experties.css";

const Experties = () => {
  const expertiseData = [
    {
      heading: "Cardiology",
      points: [
        "Heart disease diagnosis",
        "Cardiac health monitoring",
        "Hypertension management",
        "Cardiac rehabilitation",
      ],
    },
    {
      heading: "Neurology",
      points: [
        "Stroke treatment",
        "Migraine and headache management",
        "Neuromuscular diseases",
        "Epilepsy and seizure care",
      ],
    },
    {
      heading: "Orthopedics",
      points: [
        "Joint replacement",
        "Fracture treatment",
        "Sports injuries",
        "Osteoporosis care",
      ],
    },
  ];

  return (
    <div className="experties-container c-width-1 m-auto">
      <h2 className="experties-heading">Doctor's Expertise</h2>

      {expertiseData.map((expertise, index) => (
        <div key={index} className="expertise-section">
          <h3 className="expertise-title">{expertise.heading}</h3>
          <ul className="expertise-list">
            {expertise.points.map((point, i) => (
              <li key={i} className="expertise-item">{point}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="experties-paragraph com-margin">
        <h3>Professional Background</h3>
        <p>
          Dr. Smith has over 20 years of experience in the medical field, specializing in cardiology, neurology, and orthopedics. 
          With a dedication to improving patient care, Dr. Smith continuously enhances his knowledge and skills to provide the 
          highest quality of treatment and support for his patients.
        </p>
      </div>
    </div>
  );
};

export default Experties;
