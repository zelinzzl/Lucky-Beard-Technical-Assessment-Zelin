import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Change this to your backend URL

export const getArticle = async (id, setArticle, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/blogs/${id}`);
        const data = response.data;

        setArticle({
            author: data.name || 'Unknown Author',
            date: new Date(data.created_at).toLocaleDateString() || 'Unknown Date',
            category: data.category || 'Uncategorized',
            content: data.content || 'No content available',
        });
    } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
    } finally {
        setLoading(false);
    }
};