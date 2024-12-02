import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Intro from '../components/Intro';
import BlogPost from '../components/BlogPost';
import BlogQuote from '../components/BlogQuote';
import VideoBlock from '../components/Video';
import Footer from '../components/Footer';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/other/Loading.json'; 
import Arrow_Left from '../assets/other/Arrow_Left.json';
import Arrow_Right from '../assets/other/Arrow_Right.json';
import { getBlogs } from '../services/getBlogs';

function BlogListing() {
  const { category, name } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs();
        const sortedBlogs = fetchedBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBlogs(sortedBlogs);

        let filtered = sortedBlogs;
        
        if (category) {
          filtered = filtered.filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
        }
        
        if (name) {
          filtered = filtered.filter((blog) => blog.name.trim().toLowerCase() === name.trim().toLowerCase());
        }

        setFilteredBlogs(filtered);
      } catch (error) {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category, name]);

  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const arrowOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-shapes-pattern bg-no-repeat bg-cover">
      <Header />

      {/* Main content display area */}
      <main className="flex-grow">
        <div className="grid grid-cols-5 grid-rows-5 p-20 animate-slideLeft">
          <div className="col-span-2 row-span-5"><Intro /></div>
        </div>

        {/* Display applied filters */}
        <div className="text-center text-gray-700 text-xl sm:text-2xl lg:text-3xl">
          {category && <p>Category: <span className="font-bold text-[#D8A9DB]">{category}</span></p>}
          {name && <p>Author: <span className="font-bold text-[#D8A9DB]">{name}</span></p>}
        </div>

        {/* Render blogs or show "No Blogs" message */}
        <div className="mx-auto flex justify-center space-x-8 space-y-8 flex-wrap max-w-7xl animate-slideUp">
          {loading ? (
            [1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="relative max-w-xs w-full h-96 bg-white shadow-lg rounded-lg flex justify-center items-center"
              >
                <Lottie options={loaderOptions} height={100} width={100} />
              </div>
            ))
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center text-gray-500 text-lg font-semibold">
              {category ? `No blogs found for the category "${category}"` : 'Blogs are currently unavailable'}
            </div>
          ) : (
            filteredBlogs.slice(0, 3).map((blog, index) => (
              <div
                key={index}
                className={`relative max-w-xs w-full h-96 bg-white shadow-lg rounded-lg flex justify-center items-center ${index === 0 ? 'mt-8' : ''}`}
              >
                <BlogPost blog={blog} />
              </div>
            ))
          )}
        </div>

        {/* Video Block and top rated Blogs */}
        <div className="pt-20 lg:pl-50 sm:px-4 animate-slideUp">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 grid-rows-5 gap-4">
            {/* Video Block */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 row-span-4">
              <VideoBlock />
            </div>

            {/* Blog Quotes */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-4">
              <BlogQuote blogs={filteredBlogs.slice(0, 1)} />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-4 row-start-2">
              <BlogQuote blogs={filteredBlogs.slice(1, 2)} />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-4 row-start-3">
              <BlogQuote blogs={filteredBlogs.slice(2, 3)} />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-4 row-start-4">
              <BlogQuote blogs={filteredBlogs.slice(3, 4)} />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:row-start-5">
              <BlogQuote blogs={filteredBlogs.slice(4, 5)} />
            </div>
          </div>
        </div>

        {/* Blog Listing */}
        <div className="mx-auto flex justify-center space-x-8 space-y-8 flex-wrap max-w-7xl animate-slideUp">
          {loading ? (
            [1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="relative max-w-xs w-full h-96 bg-white shadow-lg rounded-lg flex justify-center items-center"
              >
                <Lottie options={loaderOptions} height={100} width={100} />
              </div>
            ))
          ) : (
            currentBlogs.map((blog, index) => (
              <div key={index} className={`relative max-w-xs w-full h-96 bg-white shadow-lg rounded-lg flex justify-center items-center ${index === 0 ? 'mt-8' : ''}`}>
                <BlogPost blog={blog} />
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 pb-10">
          {/* Prev Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4"
          >
            <Lottie options={{ ...arrowOptions, animationData: Arrow_Left }} height={24} width={24} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-[#D8A9DB] text-white' : 'bg-gray-300 text-gray-700'} rounded-md mr-2`}
            >
              {index + 1}
            </button>
          ))}
          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-4"
          >
            <Lottie options={{ ...arrowOptions, animationData: Arrow_Right }} height={24} width={24} />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BlogListing;