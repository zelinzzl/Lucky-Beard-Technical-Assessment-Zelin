import React, { useEffect, useState } from 'react';
import PreLoader from '../components/Preloader';
import Header from '../components/Header';
import Intro from '../components/Intro';
import BlogPost from '../components/BlogPost';
import BlogQuote from '../components/BlogQuote';
import VideoBlock from '../components/Video';
import Footer from '../components/Footer';

import { getBlogs } from '../services/getBlogs';

function BlogListing() {
    const [blogs, setblogs] = useState([]); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const fetchedBlogs = await getBlogs(); 
                // Sort blogs by `created_at` in descending order
                const sortedBlogs = fetchedBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setblogs(sortedBlogs);
            } catch (error) {
                setError('Failed to load blogs'); 
            }
        };

        fetchBlogs(); 
    }, []);

    // console.log(blogs);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-shapes-pattern bg-no-repeat bg-cover">
                <Header />
                <main className="flex-grow">
                    <div className="grid grid-cols-5 grid-rows-5 p-20">
                        <div className="col-span-2 row-span-5"><Intro /></div>
                    </div>

                    {/* Render blogs dynamically based on fetched data */}
                    <div className="mx-auto flex justify-center items-center space-x-8 flex-wrap max-w-7xl">
                        {blogs.slice(0,3).map((blog, index) => (
                            <BlogPost key={index} blog={blog} />
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-5 grid-rows-4 gap-8 p-20">
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

                    <div className="mx-auto flex justify-center items-center space-x-8 flex-wrap max-w-7xl mb-10">
                        {blogs.slice(3).map((blog, index) => (
                            <BlogPost key={index} blog={blog} />
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default BlogListing;