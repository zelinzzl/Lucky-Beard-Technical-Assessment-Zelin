import React from 'react';
import { Link } from 'react-router-dom'; 
import DynamicButton from './DynamicButton';
import logo from '../assets/images/Logo.png';

function Header() {
    return (
        <div className="flex items-center justify-between p-10 mx-5 animate-slideDown">
            <Link to="/">
                <img src={logo} alt="Logo" className="w-50 h-auto" />
            </Link>
            
            <DynamicButton targetPage="/BlogCreation" buttonText="Create new article" />
        </div>
    );
}

export default Header;