import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import 'animate.css/animate.min.css';  // Import animate.css for animations
import { useState } from 'react';
import '../css/Slider.css';  // Your custom CSS
import { useLocation } from 'react-router-dom';

const Slider = () => {
    const images = [
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];

    const [slideIndex, setSlideIndex] = useState(0); // Track the current slide
    const location = useLocation();
    const path = location.pathname;
    // Animation class toggles based on the slide index
    const getAnimationClass = (index) => {
        return index === slideIndex ? 'animate__animated animate__backInUp' : '';
    };

    const singleSlideContent = (
        <div className="slide-container" style={{ backgroundImage: `url(${images[0]})` }}>
            <div className={`text-container ${getAnimationClass(0)}`}>
                <h1 style={{marginBottom: "5vw"}}>{location.pathname.slice(1).toUpperCase()}</h1>
            </div>
        </div>
    );

    return (
        <>
            {path === '/' ? (
                <Slide onChange={(oldIndex, newIndex) => setSlideIndex(newIndex)}>
                    <div className="each-slide-effect">
                        <div className="slide-container" style={{ backgroundImage: `url(${images[0]})` }}>
                            <div className={`text-container ${getAnimationClass(0)}`}>
                                <h1>DR. ZUBAIR CHEEMA</h1>
                                <h3>UK trained & experienced Urologist</h3>
                                <p>
                                    Dr. Zubair Ahmad Cheema is a UK trained & experienced Urologist, currently working as a 
                                    Laparoscopic Urological Surgeon at Evercare Hospital, Lahore.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="each-slide-effect">
                        <div className="slide-container" style={{ backgroundImage: `url(${images[1]})` }}>
                            <div className={`text-container ${getAnimationClass(1)}`}>
                                <h1>EXPERTISE IN UROLOGY</h1>
                                <h3>Providing Quality Healthcare</h3>
                                <p>
                                    Specialized in laparoscopic and minimally invasive urological surgeries for a range of conditions.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="each-slide-effect">
                        <div className="slide-container" style={{ backgroundImage: `url(${images[2]})` }}>
                            <div className={`text-container ${getAnimationClass(2)}`}>
                                <h1>ADVANCED MEDICAL CARE</h1>
                                <h3>Committed to Excellence</h3>
                                <p>
                                    Using state-of-the-art technology and techniques to provide the best medical care for patients.
                                </p>
                            </div>
                        </div>
                    </div>
                </Slide>
            ) : (
                singleSlideContent
            )}
        </>
    );
};

export default Slider;
