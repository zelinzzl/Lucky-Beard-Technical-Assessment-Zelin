// src/pages/BlogCreation.js
import React, { useState } from 'react';
import { createBlog } from '../services/createBlogs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PreviewModal from '../components/PreviewModal';
import Image from '../assets/images/Default.png';
import ReactQuill from 'react-quill';  // Import the rich text editor
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

function BlogCreation() {
    const [selectedName, setSelectedName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [image, setImage] = useState(null);
    const [editorContent, setEditorContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const [article, setArticle] = useState({
        name: selectedName,
        category: selectedCategory,
        content: editorContent,
    });

    // Update article state when name is selected
    const handleNameChange = (e) => {
        setSelectedName(e.target.value);
        setArticle({ ...article, name: e.target.value });
    };

    // Update article state when category is selected
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setArticle({ ...article, category: e.target.value });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // Update content state when editor content changes
    const handleEditorChange = (value) => {
        setEditorContent(value);
        setArticle({ ...article, content: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set loading state to true
        setLoading(true);
        setError(null);

        try {
            // Prepare blog data
            const blogData = {
                name: selectedName,
                category: selectedCategory,
                content: editorContent,
                image: image,
            };

            // Call the API to create the blog post
            const newBlog = await createBlog(blogData);
            console.log('Blog created:', newBlog);

            // Reset form fields
            setSelectedName('');
            setSelectedCategory('');
            setImage(null);
            setEditorContent('');
            setArticle({ name: '', category: '', content: '' });

            setSuccess('Blog post created successfully!');
        } catch (error) {
            setError('Error creating blog post. Please try again later.');
            console.error('Error creating blog:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-background flex flex-col min-h-screen'>
            <Header />
            <img src={Image} alt="Blog Post" className="w-full h-full object-cover" />
            <main className="flex-grow">
                <form onSubmit={handleSubmit} className="space-y-6 container mx-auto mb-10">
                    {/* Name Dropdown */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="name" className="font-medium mb-2">Select your name</label>
                        <select
                            id="name"
                            value={selectedName}
                            onChange={handleNameChange}
                            className="border rounded-md p-2"
                        >
                            <option value="">Select</option>
                            <option value="John Doe">John Doe</option>
                            <option value="Jane Smith">Jane Smith</option>
                            <option value="Alice Johnson">Alice Johnson</option>
                        </select>
                    </div>

                    {/* Category Dropdown */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="category" className="font-medium mb-2">Select category</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="border rounded-md p-2"
                        >
                            <option value="">Select</option>
                            <option value="LAUNCHPAD">LAUNCHPAD</option>
                            <option value="NOTICE">NOTICE</option>
                            <option value="TEAM BUILD">TEAM BUILD</option>
                            <option value="BEARDATORIUM">BEARDATORIUM</option>
                        </select>
                    </div>

                    {/* Image Upload Section */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="image" className="font-medium mb-2">Banner Image</label>
                        <div className="bg-white border-dashed border-2 border-gray-300 rounded-md flex flex-col items-center justify-center py-10 relative">
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-gray-400 mx-auto mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-6-4l-4-4m0 0l-4 4m4-4v12"
                                    />
                                </svg>
                                <p className="text-gray-600">Click to upload or drag and drop</p>
                                <p className="text-sm text-gray-500">Max. File Size: 30MB</p>
                            </div>
                            <button
                                type="button"
                                className="mt-4 px-4 py-2 bg-button text-white rounded-xl hover:bg-orange-600"
                            >
                                Browse File
                            </button>
                        </div>
                        {image && (
                            <p className="text-sm text-gray-600 mt-2">{image.name}</p>
                        )}
                    </div>

                    {/* Article Text Editor */}
                    <div className="mb-6">
                        <label htmlFor="article" className="font-medium">Your article</label>
                        <ReactQuill
                            value={editorContent}
                            onChange={handleEditorChange}
                            theme="snow"
                            placeholder="Write your article here..."
                            className="bg-white border border-gray-300 rounded-xl p-2 text-black"
                            style={{
                                height: '200px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                            }}
                        />
                    </div>

                    <div className="flex justify-end space-x-5 mt-6">
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="px-6 py-2 text-button bg-white border-2 border-button border-solid rounded-xl hover:bg-button hover:text-white"
                        >
                            Preview
                        </button>
                        <button
                            type="submit"
                            className={`px-6 py-2 text-white bg-button rounded-xl hover:bg-white hover:text-button ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>

                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                {success && <p className="text-green-600 text-center mt-4">{success}</p>}
            </main>

            <PreviewModal isOpen={isModalOpen} onClose={toggleModal} article={article} />
            <Footer />
        </div>
    );
}

export default BlogCreation;