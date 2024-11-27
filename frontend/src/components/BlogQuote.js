import React from 'react';

function BlogQuote() {
    return (
        <div className="max-w-sm overflow-hidden">
            <div className="p-6">
                {/* Blog Info */}
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span> icon </span>
                    <span className="font-semibold text-purple-600">LAUNCHPAD</span>
                    <span> | </span>
                    <span>14/11/2024</span>
                </div>

                {/* Blog Title */}
                <p className="mt-4 text-xl font-semibold text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                </p>
            </div>
        </div>
    );
}

export default BlogQuote;
