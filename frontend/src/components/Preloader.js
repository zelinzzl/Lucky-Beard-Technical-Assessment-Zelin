import React, { useEffect, useState } from 'react';
import { preLoaderAnim } from './SplashAnimation'; // Assuming this is your animation function
import Logo from '../assets/images/Logo.png'; // Your logo image

const PreLoader = ({ onAnimationEnd }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        preLoaderAnim().then(() => {
            setIsVisible(false); // Hide the preloader when animation ends
            if (onAnimationEnd) {
                onAnimationEnd();
            }
        });
    }, [onAnimationEnd]);

    if (!isVisible) return null; // Return null to remove the component once it's hidden

    return (
        <div className="preloader fixed inset-0 flex justify-center items-center bg-background z-50">
            <div className="content-container flex flex-col justify-center items-center space-y-4">
                <div className="logo-container">
                    <img src={Logo} alt="logo" className="logo w-60 h-auto" />
                </div>
            </div>
        </div>
    );
};

export default PreLoader;