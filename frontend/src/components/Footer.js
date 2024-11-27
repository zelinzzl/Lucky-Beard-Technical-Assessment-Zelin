import React from 'react';
import { Link } from 'react-router-dom';
import DynamicButton from './DynamicButton';
import footer_logo from '../assets/images/Footer-Logo.png';
import Socials from './Socials';

function Footer() {
    return (
        <div className="bg-footer text-white py-6 px-4 w-full">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/">
                        <img src={footer_logo} alt="Logo" className="w-50 h-auto" />
                    </Link>
                </div>

                <div className="flex space-x-6">
                    <a href="/privacy-policy" className="text-sm hover:underline opacity-70">
                        Privacy policy
                    </a>
                    <div className="text-sm hover:underline opacity-30">|</div>
                    <a href="/cookie-policy" className="text-sm hover:underline opacity-70">
                        Cookie policy
                    </a>
                </div>

                <div className="flex items-center space-x-4">
                    <Socials />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center mt-4">
                <p className="text-sm">
                    By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and help our website run effectively.
                </p>
                <div className="ml-auto">
                    <DynamicButton targetPage="" buttonText="Accept" />
                </div>
            </div>
        </div>
    );
}

export default Footer;