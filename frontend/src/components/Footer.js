import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DynamicButton from './DynamicButton';
import { PrivacyPolicyModal, CookiePolicyModal } from './Modal';
import footer_logo from '../assets/images/Footer-Logo.png';
import Socials from './Socials';

function Footer() {
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [isCookiePolicyOpen, setCookiePolicyOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false); // New state for tracking button click

  // Toggle functions for modals
  const openPrivacyPolicyModal = () => setPrivacyPolicyOpen(true);
  const closePrivacyPolicyModal = () => setPrivacyPolicyOpen(false);

  const openCookiePolicyModal = () => setCookiePolicyOpen(true);
  const closeCookiePolicyModal = () => setCookiePolicyOpen(false);

  const acceptCookies = () => {
    setCookiesAccepted(true);
  };

  return (
    <div className="bg-footer text-white py-6 px-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src={footer_logo} alt="Logo" className="w-50 h-auto" />
          </Link>
        </div>

        <div className="flex space-x-6">
          <div
            className="text-sm hover:underline opacity-70"
            onClick={openPrivacyPolicyModal}
          >
            Privacy policy
          </div>
          <div className="text-sm hover:underline opacity-30">|</div>
          <div
            className="text-sm hover:underline opacity-70"
            onClick={openCookiePolicyModal}
          >
            Cookie policy
          </div>
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
          {!cookiesAccepted && (
            <DynamicButton targetPage="" buttonText="Accept" onClick={acceptCookies} />
          )}
        </div>
      </div>

      {/* Pass the isOpen and onClose props to the modals */}
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={closePrivacyPolicyModal} />
      <CookiePolicyModal isOpen={isCookiePolicyOpen} onClose={closeCookiePolicyModal} />
    </div>
  );
}

export default Footer;