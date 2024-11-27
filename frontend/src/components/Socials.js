import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Socials() {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex space-x-4"> {/* space-x-4 adds horizontal spacing between icons */}
                <div className="w-12 h-12 flex items-center justify-center bg-icons rounded-full cursor-pointer">
                    <FontAwesomeIcon icon={faWhatsapp} className="text-footer text-2xl" />
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-icons rounded-full cursor-pointer">
                    <FontAwesomeIcon icon={faFacebookF} className="text-footer text-2xl" />
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-icons rounded-full cursor-pointer">
                    <FontAwesomeIcon icon={faInstagram} className="text-footer text-2xl" />
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-icons rounded-full cursor-pointer">
                    <FontAwesomeIcon icon={faLinkedinIn} className="text-footer text-2xl" />
                </div>
            </div>
        </div>
    );
}

export default Socials;