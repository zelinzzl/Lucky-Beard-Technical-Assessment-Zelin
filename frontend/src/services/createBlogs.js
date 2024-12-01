import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();
    formData.append('name', blogData.name);
    formData.append('title', blogData.title);
    formData.append('category', blogData.category);
    formData.append('content', blogData.content);

    if (blogData.image) {
      formData.append('image', blogData.image); // Add the image file
    }

    const response = await axios.post(`${BASE_URL}/blogs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Specify multipart/form-data
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating blog post:', error.response?.data || error.message);
    throw error;
  }
};
