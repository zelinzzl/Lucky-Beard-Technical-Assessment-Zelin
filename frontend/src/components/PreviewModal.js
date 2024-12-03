import React from 'react';
import no_image from '../assets/images/no_image.png';

function PreviewModal({ isOpen, onClose, article }) {
  if (!isOpen) return null;

  console.log(article);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        {/* Banner Image */}
        <div className="mb-6">
        <img
            src={article.image || no_image}
            alt="Blog Post"
            className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        </div>

        
        <div className="grid grid-cols-5 grid-rows-5 gap-4">
            <div className="col-span-2 row-span-5">
              {/* Article Metadata */}
              <div className="space-y-4 mb-6">
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Author:</strong> {article.author || "John Doe"}
                  </p>
                  <p>
                    <strong>Date:</strong> {article.date || "14/11/2024"}
                  </p>
                  <p>
                    <strong>Category:</strong> {article.category || "NOTICE"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-3 row-span-5 col-start-3">
              {/* Article Content */}
              <div className="prose max-w-full text-gray-800 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.content || "No content available.",
                  }}
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;