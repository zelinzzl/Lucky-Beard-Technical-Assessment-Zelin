import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPost from '../components/BlogPost';
import Image from '../assets/images/card-header.png';
import axios from 'axios';

function Articles() {
    const [article, setArticle] = useState({
        author: '',
        date: '',
        category: '',
        content: '',
    });

    // Fetch data from backend
    useEffect(() => {
        axios.get('/api/article')
            .then((response) => {
                setArticle(response.data);
            })
            .catch((error) => {
                console.error('Error fetching the article:', error);
            });
    }, []);

    return (
        <div className="bg-background">
            <Header />
            <img src={Image} alt="Blog Post" className="w-full h-full object-cover" />
            <main className="flex flex-col items-center justify-center p-10">
                <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-4xl">
                    {/* Header Information */}
                    <div className="flex flex-col space-y-4 mb-8">
                        <div className="text-gray-600 text-sm">
                            <strong>Author:</strong> {article.author || 'Loading...'}
                        </div>
                        <div className="text-gray-600 text-sm">
                            <strong>Date:</strong> {article.date || 'Loading...'}
                        </div>
                        <div className="text-gray-600 text-sm">
                            <strong>Category:</strong> {article.category || 'Loading...'}
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="text-gray-800 leading-relaxed">
                        {article.content || 'Loading content...'}
                    </div>
                </div>

                {/* Related Articles */}
                <div className="text-4xl tracking-tight mt-12 mb-8">
                    Related Articles
                </div>
                <div className="mx-auto flex justify-center items-center space-x-8 flex-wrap max-w-7xl">
                    <BlogPost />
                    <BlogPost />
                    <BlogPost />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Articles;