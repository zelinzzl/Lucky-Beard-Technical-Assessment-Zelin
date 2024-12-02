import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
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
import Like from '../assets/other/Thumbs_up.json';
import Like_white from '../assets/other/Thumbsup_white.json';
import { getArticle } from '../services/getArticle';
import { getBlogs } from '../services/getBlogs';
import { likingBlogs } from '../services/likingBlogs';

function Articles() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isHovered, setIsHovered] = useState(false);  // State to track hover
  const [likes, setLikes] = useState(false);

  const [article, setArticle] = useState({
    title: '',
    author: '',
    date: '',
    category: '',
    content: '',
    image: '', 
    id: null,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs(); 
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

  const categoryAnimations = {
    'LAUNCHPAD': Blog,
    'BEARDATORIUM': lightbulb,
    'TEAM BUILD': team,
    'NOTICE': Announcement,
    'Other': schedule,
  };

  useEffect(() => {
    getArticle(id, setArticle, setLoading, setError);
  }, [id]);

  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleLike = async () => {
    if (!id) {
      console.error('Article ID is missing');
      setError('Article ID is missing. Cannot process the request.');
      return;
    }
    try {
      const newLikeState = !likes;
      await likingBlogs(id, newLikeState, setLikes, setError);
    } catch (error) {
      console.error('Error liking blog:', error);
      setError('Error liking blog');
    }
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

  const selectedAnimation = categoryAnimations[article.category] || schedule;

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
        <div className='mb-20 animate-slideRight'>
          <img
            src={article.image || no_image}
            alt="Blog Post"
            className="w-[1700px] h-[700px] object-cover mx-auto"
          />
        </div>
        <button
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-button text-white px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-button hover:border-2 hover:border-button transition"
        >
          &larr; Back
        </button>
      </div>

      <main className="flex flex-col items-center justify-center px-10 py-10 animate-slideRight">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-5 grid-rows-5 gap-6">
            <div className="col-span-2 row-span-5">
              <div className="flex flex-col space-y-4 mb-8 text-left">
                <div className="text-sm text-gray-600">
                  <strong>Title:</strong> <br />
                  {article.title}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Author:</strong> <br />
                  <button
                    onClick={() => navigate(`/blogs/${article.author}`)} // Navigate to the filtered blog page by author
                    className="text-blue-500 hover:underline"
                  >
                    {article.author || "John Doe"}
                  </button>
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
                    <button
                      onClick={() => navigate(`/blogs/category/${article.category}`)}  // Navigate to the category filter
                      className="text-blue-500 hover:underline"
                    >
                      {article.category || "NOTICE"}
                    </button>
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleLike()} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`px-4 py-2 rounded-lg shadow-md transition flex items-center space-x-2 ${
                  likes
                    ? 'bg-[#D8A9DB] text-white hover:bg-[#D8A9DB]' 
                    : 'bg-gray-200 text-gray-600 hover:bg-[#D8A9DB] hover:text-white'
                }`}
              >
                <div className="w-6 h-6">
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: likes || isHovered ? Like_white : Like, 
                      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
                    }}
                    height={24}
                    width={24}
                  />
                </div>
                <span>{likes ? "Liked" : "Like"}</span>
              </button>
            </div>

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