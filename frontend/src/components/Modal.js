import React from 'react';

const Modal = ({ title, content, isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 h-4/5 overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-gray-600 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          <div className="text-sm text-gray-600">
            {content}
          </div>
        </div>
      </div>
    );
  };
  
  const PrivacyPolicyModal = ({ isOpen, onClose }) => {
    const privacyPolicyContent = (
      <div>
        <h3 className="font-semibold">Privacy Policy</h3>
        <p>Our Privacy Policy explains how we collect, use, and protect your information...</p>
        <p>Here, we outline your rights and how we ensure your data is protected...</p>
        {/* Add the rest of your privacy policy content here */}
      </div>
    );
  
    return (
      <Modal 
        title="Privacy Policy"
        content={privacyPolicyContent}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  };
  
  const CookiePolicyModal = ({ isOpen, onClose }) => {
    const cookiePolicyContent = (
      <div>
        <h3 className="font-semibold">Cookie Policy</h3>
        <p>Our Cookie Policy explains how we use cookies to improve user experience...</p>
        <p>We use cookies for analytics, marketing, and essential functions...</p>
        {/* Add the rest of your cookie policy content here */}
      </div>
    );
  
    return (
      <Modal 
        title="Cookie Policy"
        content={cookiePolicyContent}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  };
  
  export { PrivacyPolicyModal, CookiePolicyModal };