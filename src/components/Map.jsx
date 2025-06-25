
const Map = () => {
  return (
    <div className="map-container" style={{padding: "5vw 0"}}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1702.379028594289!2d74.26205823865682!3d31.420791382461168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901aaeabca3d5%3A0x4110414256dffdd9!2sWAPDA%20Town%20Block%20K%202%20Wapda%20Town%20Phase%201%20WAPDA%20Town%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1729941265672!5m2!1sen!2s"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
