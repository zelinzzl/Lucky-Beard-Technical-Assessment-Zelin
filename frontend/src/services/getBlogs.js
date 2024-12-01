import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Change this to your backend URL

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs`);
    return response.data; // Return the data from the API response
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Rethrow the error to handle it in the component if needed
  }
};
