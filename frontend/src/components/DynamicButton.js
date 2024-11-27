import React from 'react';
import { useNavigate } from 'react-router-dom';

const DynamicButton = ({ targetPage, buttonText }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(targetPage);
    };

    return (
        <button
            onClick={handleClick}
            className="bg-button text-white px-6 py-3 rounded-2xl text-lg hover:bg-white hover:text-button hover:border-2 hover:border-button"
        >
            {buttonText}
        </button>
    );
};

export default DynamicButton;