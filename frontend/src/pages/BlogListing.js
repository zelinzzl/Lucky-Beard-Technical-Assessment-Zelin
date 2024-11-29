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
    const [posts, setPosts] = useState([]); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const fetchedPosts = await getBlogs(); 
                setPosts(fetchedPosts); 
            } catch (error) {
                setError('Failed to load posts'); 
            }
        };

        fetchBlogs(); 
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-shapes-pattern bg-no-repeat bg-cover">
                <Header />
                <main className="flex-grow">
                    <div className="grid grid-cols-5 grid-rows-5 p-20">
                        <div className="col-span-2 row-span-5"><Intro /></div>
                    </div>

                    {/* Render posts dynamically based on fetched data */}
                    <div className="mx-auto flex justify-center items-center space-x-8 flex-wrap max-w-7xl">
                        {posts.map((post, index) => (
                            <BlogPost key={index} post={post} />
                        ))}
                    </div>

                    <div className="grid grid-cols-5 grid-rows-5 gap-4 p-10">
                        <div className="col-span-3 row-span-3">
                            <VideoBlock />
                        </div>
                        <div className="col-span-2 row-span-5 col-start-4">
                            <BlogQuote />
                            <BlogQuote />
                            <BlogQuote />
                        </div>
                        <div className="col-span-3 row-span-2 row-start-4">
                            <BlogQuote />
                        </div>
                    </div>

                    <div className="mx-auto flex justify-center items-center space-x-8 flex-wrap max-w-7xl mb">
                        {posts.map((post, index) => (
                            <BlogPost key={index} post={post} />
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default BlogListing;