import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { getArticle } from '../services/getArticle';

function Articles() {
    const { id } = useParams(); // Extract the `id` parameter from the route
    const [article, setArticle] = useState({
        author: '',
        date: '',
        category: '',
        content: '',
    });
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

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

    if (loading) {
        return (
            <div className="bg-background">
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <p>Loading article...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-background">
                <Header />
                <div className="flex justify-center items-center h-screen">
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
        <div className="bg-background">
            <Header />
            <img src={no_image} alt="Blog Post" className="w-full h-full object-cover" />
            <main className="flex flex-col items-center justify-center p-10">
                <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-full">
                    <div className="grid grid-cols-5 grid-rows-5 gap-4">
                        <div className="col-span-2 row-span-5">
                            <div className="flex flex-col space-y-4 mb-8 text-left">
                                <div className="text-sm text-gray-600">
                                    <strong>Author:</strong> <br />
                                    {article.author || "John Doe"}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>Date:</strong> <br />
                                    {article.date || "14/11/2024"}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>Category:</strong> <span className="flex items-center">
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
                        <div className="col-span-3 row-span-5 col-start-3">
                            <div
                                className="text-gray-800 leading-relaxed text-left"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            ></div>
                        </div>
                    </div>
                </div>

                <hr className="my-12 w-full max-w-4xl" />

                <div className="text-4xl tracking-tight mt-6 mb-8">
                    Related Articles
                </div>
                <div className="mx-auto flex justify-center items-center space-x-8 flex-wrap max-w-7xl mb-10">
                    <BlogPost blog={article} />
                    <BlogPost blog={article} />
                    <BlogPost blog={article} />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Articles;