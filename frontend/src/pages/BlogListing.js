import React from 'react';
import PreLoader from '../components/Preloader';
import Header from '../components/Header';
import Intro from '../components/Intro';
import BlogPost from '../components/BlogPost';
import BlogQuote from '../components/BlogQuote';
import VideoBlock from '../components/Video';
import Footer from '../components/Footer';

function BlogListing() {
    return (
        <>
            {/* <PreLoader /> */}
            <div className="flex flex-col min-h-screen bg-shapes-pattern bg-no-repeat bg-cover">
                <Header />
                <main className="flex-grow">
                    <div className="grid grid-cols-5 grid-rows-5 p-20">
                        <div className="col-span-2 row-span-5"><Intro /></div>
                    </div>

                    <div className="mx-auto flex justify-center items-center space-x-8 flex-wrap max-w-7xl">
                        <BlogPost />
                        <BlogPost />
                        <BlogPost />
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

                    <div className="mx-auto flex justify-center items-center space-x-8 space-y-8 flex-wrap max-w-7xl mb-10">
                        <BlogPost />
                        <BlogPost />
                        <BlogPost />
                        <BlogPost />
                        <BlogPost />
                        <BlogPost />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default BlogListing;