import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from '../assets/images/Default.png';
import ReactQuill from 'react-quill';  // Import the rich text editor
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

function BlogCreation() {
    // State for form fields
    const [selectedName, setSelectedName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [image, setImage] = useState(null);
    const [editorContent, setEditorContent] = useState('');

    // Handle name selection
    const handleNameChange = (e) => setSelectedName(e.target.value);

    // Handle category selection
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // Handle editor content change
    const handleEditorChange = (value) => setEditorContent(value);

    return (
        <div className='bg-background flex flex-col min-h-screen'>
            <Header />
            <img src={Image} alt="Blog Post" className="w-full h-full object-cover" />
            <main className="flex-grow">
                <form className="space-y-6 container mx-auto mb-10">
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
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Business">Business</option>
                            <option value="Health">Health</option>
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
                                borderRadius: '12px', // For rounded borders
                                overflow: 'hidden',  // Prevent content overflow
                            }}
                        />
                    </div>

                    <style jsx>
                    {`
                        .ql-container {
                            border: none !important; /* Removes the inner box border */
                            border-radius: 12px;     /* Rounds inner content */
                            background-color: transparent; /* Makes the background invisible */
                        }

                        .ql-editor {
                            padding: 0.5rem 1rem;  /* Adds padding inside the editor */
                            border-radius: 12px;   /* Matches outer border radius */
                        }

                        .ql-toolbar {
                            border: none !important; /* Removes toolbar borders */
                            border-radius: 12px;     /* Rounds the toolbar */
                        }
                    `}
                    </style>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-5 mt-6">
                        <button type="button" className="px-6 py-2 text-button bg-white border-2 border-button border-solid rounded-xl hover:bg-button hover:text-white"                >
                            Preview
                        </button>
                        <button type="submit" className="px-6 py-2 text-white bg-button rounded-xl hover:bg-white hover:text-button">
                            Submit
                        </button>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}

export default BlogCreation;