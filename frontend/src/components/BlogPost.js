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

  // Define the category-to-animation mapping
  const categoryAnimations = {
    'LAUNCHPAD': Blog,
    'BEARDATORIUM': lightbulb,
    'TEAM BUILD': team,
    'NOTICE': Announcement,
    'Other': schedule,
  };

  // Set the Lottie animation based on the blog's category, default to 'lightbulb' if category doesn't match
  const selectedAnimation = categoryAnimations[blog.category];

  // Define the Lottie animation options
  const lottieOptions = {
    loop: true, // Set to true if you want the animation to repeat
    autoplay: true, // Set to true if you want the animation to autoplay
    animationData: selectedAnimation, // Set the animation data to the selected category animation
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust the rendering settings
    },
  };

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-96"> {/* Enforce consistent height */}
      {/* Image Section */}
      <img
        src={blog.image_url || no_image}
        alt="Blog Post"
        className="w-full h-48 object-cover"
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
        <h2 className="mt-4 text-xl font-semibold text-gray-800 flex items-center">
          {blog.name}
        </h2>

        {/* Blog Description */}
        <div
          className="mt-2 text-sm text-gray-600 flex-grow overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: `${blog.content.substring(0, 100)}...`, // Truncate the content for preview
          }}
        ></div>

        {/* Read More Button */}
        <div className="mt-4">
          <Link
            to={{
              pathname: `/Articles/${blog.id}`,
              state: { blog },
            }}
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