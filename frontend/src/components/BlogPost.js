import React from 'react';
import Image from '../assets/images/example.png'

function BlogPost() {
    return (
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image Section */}
            <img src={Image} alt="Blog Post" className="w-full h-48 object-cover" />

            {/* Content Section */}
            <div className="p-6">
                {/* Blog Info */}
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="font-semibold text-purple-600">LAUNCHPAD</span>
                    <span> | </span>
                    <span>14/11/2024</span>
                </div>

                {/* Blog Title */}
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                </h2>

                {/* Blog Description */}
                <p className="mt-2 text-sm text-gray-600">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                {/* Read More Button */}
                <div className="mt-4">
                    <a href="/Articles" className="px-6 py-2 text-white bg-button rounded-xl hover:bg-white hover:text-button hover:border-2 hover:border-button">
                        Read more &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;
