import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Intro from '../components/Intro';
import BlogPost from '../components/BlogPost';
import BlogQuote from '../components/BlogQuote';
import VideoBlock from '../components/Video';
import Footer from '../components/Footer';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/other/Loading.json'; // Loader animation

import { getBlogs } from '../services/getBlogs';

function BlogListing() {
    const [blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

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

    // Loader Lottie options
    const loaderOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <>
            <div className="flex flex-col min-h-screen bg-shapes-pattern bg-no-repeat bg-cover">
                <Header />
                <main className="flex-grow">
                    <div className="grid grid-cols-5 grid-rows-5 p-20 animate-slideLeft">
                        <div className="col-span-2 row-span-5"><Intro /></div>
                    </div>

                    {/* Render blogs dynamically based on fetched data */}
                    <div className="mx-auto flex justify-center items-center space-x-8 flex-wrap max-w-7xl animate-slideUp">
                        {loading ? (
                            [1, 2, 3].map((_, index) => ( // Show loaders for the first 3 cards
                                <div
                                    key={index}
                                    className="relative max-w-sm w-full h-96 bg-white shadow-lg rounded-lg flex justify-center items-center"
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

                    <div className="grid grid-cols-5 grid-rows-4 gap-8 p-20 pl-80">
                        <div className="col-span-3 row-span-3">
                            <VideoBlock />
                        </div>
                        <div className="col-span-2 col-start-4">
                            <BlogQuote />
                        </div>
                        <div className="col-span-2 col-start-4 row-start-2">
                            <BlogQuote />
                        </div>
                        <div className="col-span-2 col-start-4 row-start-3">
                            <BlogQuote />
                        </div>
                        <div className="col-span-2 col-start-4 row-start-4">
                            <BlogQuote />
                        </div>
                        <div className="col-span-3 col-start-1 row-start-4">
                            <BlogQuote />
                        </div>
                    </div>

                    <div className="mx-auto flex flex-wrap justify-center items-center gap-8 max-w-7xl mb-10 animate-slideUp">
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
                        blogs.slice(3).map((blog, index) => (
                        <BlogPost key={index} blog={blog} />
                        ))
                    )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default BlogListing;