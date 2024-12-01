import React from 'react';
import { Link } from 'react-router-dom';
import no_image from '../assets/images/no_image.png';
import Lottie from 'react-lottie';
import Blog from '../assets/other/Blog.json';
import lightbulb from '../assets/other/lightbulb.json';
import schedule from '../assets/other/Schedule.json';
import team from '../assets/other/Team.json';
import Announcement from '../assets/other/Unmute V2.json';

function BlogPost({ blog }) {
  if (!blog) {
    return <p>No blog found.</p>;
  }

  console.log(blog);

  // Define the category-to-animation mapping
  const categoryAnimations = {
    'LAUNCHPAD': Blog,
    'BEARDATORIUM': lightbulb,
    'TEAM BUILD': team,
    'NOTICE': Announcement,
    'Other': schedule,
  };

  const selectedAnimation = categoryAnimations[blog.category];

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-96">
      {/* Image Section */}
      <img
        src={blog.image_url || no_image}
        alt="Blog Post"
        className="w-full h-48 object-cover overflow-hidden"
      />

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Blog Info */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>
            <Lottie options={lottieOptions} height={30} width={30} className="mr-2" />
          </span>
          <span className="font-semibold text-gray-600">{blog.category}</span>
          <span> | </span>
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>

        {/* Blog Title */}
        <h2 className="mt-4 text-xl font-bold text-gray-800 flex items-center">
          {blog.title || "Untitled"}
        </h2>

        {/* Blog Description */}
        <div
          className="mt-2 text-sm text-gray-600 flex-grow overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: `${blog.content.substring(0, 100)}...`,
          }}
        ></div>

        {/* Read More Button */}
        <div className="mt-4">
          <Link
            to={`/Articles/${blog.id}`}
            className="px-6 py-2 text-white bg-button rounded-xl hover:bg-white hover:text-button hover:border-2 hover:border-button"
          >
            Read more &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;