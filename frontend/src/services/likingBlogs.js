import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const likingBlogs = async (id, setLikes, setError) => {
  try {
    const response = await axios.post(`${BASE_URL}/blogs/${id}/like`);
    const data = response.data;

    // Update the likes state with the new value
    setLikes(data.likes);
  } catch (err) {
    console.error('Error liking the blog:', err);
    if (setError) setError('Failed to like the blog. Please try again later.');
  }
};

export const unlikingBlogs = async (id, setLikes, setError) => {
  try {
    const response = await axios.post(`${BASE_URL}/blogs/${id}/unlike`);
    const data = response.data;

    // Update the likes state with the new value
    setLikes(data.likes);
  } catch (err) {
    console.error('Error liking the blog:', err);
    if (setError) setError('Failed to like the blog. Please try again later.');
  }
};