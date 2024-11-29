// frontend/src/components/BlogPost.js
import React from 'react';
import Image from '../assets/images/example.png';

function BlogPost({ post, key }) {
  // If no post is provided, show an error message
  if (!post) {
    return <p>No post found.</p>;
  }

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden" key={key}>
      {/* Image Section */}
      <img src={post.image_url || Image} alt="Blog Post" className="w-full h-48 object-cover" />

      {/* Content Section */}
      <div className="p-6">
        {/* Blog Info */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="font-semibold text-purple-600">{post.category}</span>
          <span> | </span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>

        {/* Blog Title */}
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {post.name}
        </h2>

        {/* Blog Description */}
        <p className="mt-2 text-sm text-gray-600">
          {post.content.substring(0, 100)}... {/* Truncate the content for preview */}
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