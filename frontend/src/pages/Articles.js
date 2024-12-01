import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for back navigation
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPost from '../components/BlogPost';
import no_image from '../assets/images/no_image.png';
import Lottie from 'react-lottie';
import Blog from '../assets/other/Blog.json';
import lightbulb from '../assets/other/lightbulb.json';
import schedule from '../assets/other/Schedule.json';
import team from '../assets/other/Team.json';
import Announcement from '../assets/other/Unmute V2.json';
import loadingAnimation from '../assets/other/Loading.json';
import { getArticle } from '../services/getArticle';
import { getBlogs } from '../services/getBlogs';

function Articles() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const [article, setArticle] = useState({
    title: '',
    author: '',
    date: '',
    category: '',
    content: '',
    image: '', 
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs(); 
        // Sort blogs by `created_at` in descending order
        const sortedBlogs = fetchedBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBlogs(sortedBlogs);
      } catch (error) {
        setError('Failed to load blogs'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchBlogs(); 
  }, []);

  // Define the category-to-animation mapping, same as BlogPost component
  const categoryAnimations = {
    'LAUNCHPAD': Blog,
    'BEARDATORIUM': lightbulb,
    'TEAM BUILD': team,
    'NOTICE': Announcement,
    'Other': schedule,
  };

  useEffect(() => {
    // Fetch the article from the API using the ID
    getArticle(id, setArticle, setLoading, setError);
  }, [id]);

  console.log(article);

  // Loader Lottie options
  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (loading) {
    return (
      <div className="bg-background h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 justify-center items-center">
          <div className="w-48 h-48">
            <Lottie options={loaderOptions} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Set the selected animation based on the article category
  const selectedAnimation = categoryAnimations[article.category] || schedule;

  // Define the Lottie animation options for the category
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Header />
      <div className="relative">
        <div className='mb-20'>
          <img
            src={article.image || no_image}
            alt="Blog Post"
            className="w-[1700px] h-[700px] object-cover mx-auto"
          />
        </div>
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          className="absolute top-4 left-4 bg-button text-white px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-button hover:border-2 hover:border-button transition"
        >
          &larr; Back
        </button>
      </div>

      <main className="flex flex-col items-center justify-center px-10 py-10">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-5 grid-rows-5 gap-6">
            {/* Left Column: Metadata */}
            <div className="col-span-2 row-span-5">
              <div className="flex flex-col space-y-4 mb-8 text-left">
              <div className="text-sm text-gray-600">
                    <strong>Title:</strong> <br />
                    {article.title}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Author:</strong> <br />
                  {article.author || "John Doe"}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Date:</strong> <br />
                  {article.date || "14/11/2024"}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Category:</strong>
                  <span className="flex items-center mt-1">
                    <span className="mr-2">
                      <div className="flex justify-center items-center">
                        <Lottie options={lottieOptions} height={30} width={30} />
                      </div>
                    </span>
                    {article.category || "NOTICE"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Main Content */}
            <div className="col-span-3 row-span-5 col-start-3">
              <div
                className="text-gray-800 leading-relaxed text-left"
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>
            </div>
          </div>
        </div>

        <hr className="mt-20 w-full max-w-4xl" />
      </main>

      <div className="flex flex-col items-center justify-center text-4xl tracking-tight mt-6 mb-8">
        Related Articles
      </div>
      <div className="mx-auto flex flex-nowrap justify-center items-center gap-8 max-w-7xl mb-10 animate-slideUp">
        {loading ? (
          [1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative w-72 h-96 bg-white shadow-lg rounded-lg flex justify-center items-center"
            >
              <Lottie options={loaderOptions} height={100} width={100} />
            </div>
          ))
        ) : (
          blogs.slice(0, 3).map((blog, index) => (
            <BlogPost key={index} blog={blog} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Articles;