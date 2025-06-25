import "../css/Cards1.css"; // Add this for styling if needed

const Cards1 = () => {
  const cardData = [
    {
      icon: '🩺', // Placeholder icon
      title: 'Urological Cancers',
      description: 'Moreover, he advances treatment for complex urological cancers.',
    },
    {
      icon: '🔍', // Placeholder icon
      title: 'Endoscopic treatment options',
      description: 'Additionally, the endoscopic medication for renal and ureteric stones includes RIRRS.',
    },
    {
      icon: '💧', // Placeholder icon
      title: 'Urinary tract diseases',
      description: 'For cure options for urinary tract diseases, symptoms, and overactive bladder, as well as BPH, explore various treatment modalities.',
    },
    {
        icon: '🩺', // Placeholder icon
        title: 'Urological Cancers',
        description: 'Moreover, he advances treatment for complex urological cancers.',
      },
      {
        icon: '🔍', // Placeholder icon
        title: 'Endoscopic treatment options',
        description: 'Additionally, the endoscopic medication for renal and ureteric stones includes RIRRS.',
      },
      {
        icon: '💧', // Placeholder icon
        title: 'Urinary tract diseases',
        description: 'For cure options for urinary tract diseases, symptoms, and overactive bladder, as well as BPH, explore various treatment modalities.',
      },
  ];

  return (
    <div className="com-bg">
    <div className="c-width-1 card-container-1 m-auto d-flex" style={{justifyContent: 'space-around' }}>
      {cardData.map((card, index) => (
        <div key={index} className="card">
          <div className="card-icon">{card.icon}</div>
          <h3 className="card-title">{card.title}</h3>
          <p className="card-description">{card.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Cards1;
