import React, { useState } from 'react';
import { createBlog } from '../services/createBlogs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PreviewModal from '../components/PreviewModal';
import DefaultImage from '../assets/images/Default.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Lottie from 'react-lottie';
import UploadAnimation from '../assets/other/upload.json';

function BlogCreation() {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(DefaultImage);
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const uploadOptions = {
    loop: true,
    autoplay: true,
    animationData: UploadAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAuthorNameChange = (e) => setAuthorName(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (value) => setEditorContent(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const blogData = {
        name: authorName,
        title: title,
        category: selectedCategory,
        content: editorContent,
        image,
      };
  
      // Await the promise returned by createBlog to ensure the blog is created before clearing the form
      await createBlog(blogData);
  
      // Reset form fields after successful submission
      setTitle('');
      setAuthorName('');
      setSelectedCategory('');
      setImage(null);
      setImagePreview(DefaultImage);
      setEditorContent('');
      setSuccess('Blog post created successfully!');
    } catch (error) {
      setError('Error creating blog post. Please try again later.');
      console.error('Error creating blog:', error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Header />
      <div className="mb-20">
        <img
          src={imagePreview}
          alt="Blog Post"
          className="w-[1700px] h-[700px] object-cover mx-auto"
        />
      </div>
      <main className="flex flex-col items-center justify-center px-10 py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-6xl">
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
          <div className="flex flex-col mb-4">
            <label htmlFor="category" className="font-medium mb-2">
              Select category
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
                <button
                  type="button"
                  className="px-6 py-2 text-white bg-button rounded-2xl hover:bg-white hover:text-button border-2 border-button transition-all"
                >
                  Browse File
                </button>
              </div>
            </div>
            {image && <p className="text-sm text-gray-600 mt-2">{image.name}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="article" className="font-medium">
              Your article
            </label>
            <ReactQuill
              value={editorContent}
              onChange={handleEditorChange}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Start typing here..."
              theme="snow"
            />
          </div>
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
              className={`px-6 py-2 text-white bg-button border-2 border-solid rounded-xl ${
                loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white hover:text-button hover:border-button'
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        {success && <p className="text-green-600 text-center mt-4">{success}</p>}
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