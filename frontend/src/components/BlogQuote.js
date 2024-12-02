import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import Blog from '../assets/other/Blog.json';
import lightbulb from '../assets/other/lightbulb.json';
import schedule from '../assets/other/Schedule.json';
import team from '../assets/other/Team.json';
import Announcement from '../assets/other/Unmute V2.json';

function BlogQuote({ blogs }) {
  // Define the category-to-animation mapping
  const categoryAnimations = {
    'LAUNCHPAD': Blog,
    'BEARDATORIUM': lightbulb,
    'TEAM BUILD': team,
    'NOTICE': Announcement,
    'Other': schedule,
  };

  return (
    <div className="space-y-4">
      {blogs.map(blog => {
        const selectedAnimation = categoryAnimations[blog.category] || schedule;

        const lottieOptions = {
          loop: true,
          autoplay: true,
          animationData: selectedAnimation,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        };

        return (
          <div key={blog.id} className="max-w-sm w-full bg-transparent overflow-hidden flex flex-col">
            {/* Blog Info */}
            <div className="p-6 flex flex-col">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>
                  <Lottie options={lottieOptions} height={30} width={30} className="mr-2" />
                </span>
                <span className="font-semibold text-purple-600">{blog.category}</span>
                <span> | </span>
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>

              {/* Blog Title */}
              <p className="mt-4 text-xl font-semibold text-gray-800">
                {blog.title || "Untitled"}
              </p>

              {/* Read More Button */}
              {/* <div className="mt-4">
                <Link
                  to={`/Articles/${blog.id}`}
                  className="px-6 py-2 text-white bg-button rounded-xl hover:bg-white hover:text-button hover:border-2 hover:border-button"
                >
                  Read more &rarr;
                </Link>
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BlogQuote;