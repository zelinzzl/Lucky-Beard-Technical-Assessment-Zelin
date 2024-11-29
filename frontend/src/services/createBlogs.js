import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'http://localhost:5000/api';

export const createBlog = async (blogData) => {
  try {
    const response = await axios.post(`${BASE_URL}/blogs`, {
      name: blogData.name,
      category: blogData.category,
      content: blogData.content,
      // Convert the image to a base64 string if needed
      image: blogData.image ? await toBase64(blogData.image) : null,
    }, {
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
    });

    return response.data; // Return the data from the API response
  } catch (error) {
    console.error('Error creating blog post:', error.response?.data || error.message);
    throw error; // Rethrow the error to handle it in the component if needed
  }
};

// Utility function to convert an image file to a Base64 string
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
