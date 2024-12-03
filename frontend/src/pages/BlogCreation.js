import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PreviewModal from '../components/PreviewModal';
import DefaultImage from '../assets/images/Default.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Lottie from 'react-lottie';
import UploadAnimation from '../assets/other/upload.json';
import axios from 'axios';
import { supabase } from '../services/supabaseClient';

function BlogCreation() {
  // State variables for managing form data and UI
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState(null); // For local file uploads
  const [cloudImageUrl, setCloudImageUrl] = useState(null); // For cloud image URLs
  const [imagePreview, setImagePreview] = useState(DefaultImage);
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cloudImages, setCloudImages] = useState([]);
  const [isCloudImagesVisible, setIsCloudImagesVisible] = useState(false);

  // Toggle Preview Modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Lottie animation configuration for the upload section
  const uploadOptions = {
    loop: true,
    autoplay: true,
    animationData: UploadAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Input handlers
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAuthorNameChange = (e) => setAuthorName(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 30 * 1024 * 1024) { // Validate file size (30MB limit)
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setError('File size must be 30MB or less.');
    }
  };

  // Handle rich text editor content change
  const handleEditorChange = (value) => setEditorContent(value);

  // Form submission handler with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    if (!title.trim()) {
      setError('Title is required.');
      setLoading(false);
      return;
    }
    if (!authorName.trim()) {
      setError('Author name is required.');
      setLoading(false);
      return;
    }
    if (!selectedCategory) {
      setError('Category selection is required.');
      setLoading(false);
      return;
    }
    if (!editorContent.trim()) {
      setError('Content cannot be empty.');
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('name', authorName);
    formData.append('title', title);
    formData.append('category', selectedCategory);
    formData.append('content', editorContent);
  
    if (image) {
      formData.append('image', image);
    } else if (cloudImageUrl) {
      formData.append('cloudImageUrl', cloudImageUrl); // Send cloudImageUrl explicitly
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      setSuccess('Blog post created successfully!');
      setTitle('');
      setAuthorName('');
      setSelectedCategory('');
      setImage(null);
      setCloudImageUrl(null);
      setImagePreview(DefaultImage);
      setEditorContent('');
    } catch (error) {
      setError('Error creating blog post. Please try again later.');
      console.error('Error creating blog:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rich text editor configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'script',
    'indent',
    'align',
    'link',
    'image',
    'video',
  ];

  // Fetch cloud images from Supabase
  const fetchCloudImages = async () => {
    const { data, error } = await supabase.storage.from('images').list('defaults', { limit: 12 });
    if (error) {
      console.error('Error fetching cloud images:', error);
      return;
    }
    const imageUrls = data.map((file) =>
      supabase.storage.from('images').getPublicUrl(`defaults/${file.name}`).data.publicUrl
    );
    setCloudImages(imageUrls.filter(Boolean)); // Filter valid URLs
    setIsCloudImagesVisible(true);
  };

  // Handle cloud image selection
  const handleCloudImageSelect = (imageUrl) => {
    setImagePreview(imageUrl);
    setCloudImageUrl(imageUrl);
    setImage(null); // Clear any existing file upload
    setIsCloudImagesVisible(false);
  };

  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Header />
      {/* Image Preview Section */}
      <div className="mb-20 animate-slideDown">
        <img
          src={imagePreview}
          alt="Blog Post"
          className="w-[1500px] h-[700px] object-cover mx-auto"
          // className="w-[1700px] h-[700px] object-cover mx-auto"
        />
      </div>
      <main className="flex flex-col items-center justify-center px-10 py-10">
        {/* Blog Creation Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-6xl animate-slideUp">
          {/* Title Input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter the title of the blog"
              className="border rounded-md p-2"
              required
            />
          </div>
          {/* Author Name Input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="authorName" className="font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={handleAuthorNameChange}
              placeholder="Enter your name"
              className="border rounded-md p-2"
              required
            />
          </div>
          {/* Category Selection */}
          <div className="flex flex-col mb-4">
            <label htmlFor="category" className="font-medium mb-2">
              Select Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border rounded-md p-2"
              required
            >
              <option value="">Select</option>
              <option value="LAUNCHPAD">LAUNCHPAD</option>
              <option value="NOTICE">NOTICE</option>
              <option value="TEAM BUILD">TEAM BUILD</option>
              <option value="BEARDATORIUM">BEARDATORIUM</option>
            </select>
          </div>
          {/* Image Upload */}
          <div className="flex flex-col mb-4">
            <label htmlFor="image" className="font-medium mb-2">
              Banner Image
            </label>
            <div className="bg-white border-dashed border-2 border-gray-300 rounded-md flex flex-col items-center justify-center py-8 relative">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <div className="flex justify-center items-center">
                  <div className="w-24 h-w-24">
                    <Lottie options={uploadOptions} />
                  </div>
                </div>
                <p className="text-gray-600 mt-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">Max. File Size: 30MB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={fetchCloudImages}
              className="mt-3 text-blue-600 underline hover:opacity-80"
            >
              Choose from Cloud Images
            </button>
            {isCloudImagesVisible && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {cloudImages.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`Cloud Image ${idx + 1}`}
                    className="border rounded-md cursor-pointer w-full h-auto"
                    onClick={() => handleCloudImageSelect(imgUrl)}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Rich Text Editor */}
          <div className="flex flex-col mb-4">
            <label htmlFor="editorContent" className="font-medium mb-2">
              Blog Content
            </label>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={handleEditorChange}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Write your blog content here..."
            />
          </div>
          {/* Error or Success Message */}
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}
          {/* Submit Button */}
          <div className="flex justify-end space-x-5 mt-6">
            <button
              type="button"
              onClick={toggleModal}
              className="px-6 py-2 text-button bg-white border-2 border-button border-solid rounded-xl hover:bg-button hover:text-white hover:border-button"
            >
              Preview
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-button border-2 border-button border-solid rounded-xl hover:bg-white hover:text-button hover:border-button"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Blog'}
            </button>
          </div>
        </form>
      </main>
      <PreviewModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        article={{
          title,
          image: imagePreview,
          author: authorName,
          date: new Date().toLocaleDateString(),
          category: selectedCategory,
          content: editorContent,
        }}
      />
      <Footer />
    </div>
  );
}

export default BlogCreation;