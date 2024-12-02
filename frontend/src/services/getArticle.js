import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

export const getArticle = async (id, setArticle, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/blogs/${id}`);
        const data = response.data;

        setArticle({
            author: data.name || 'Unknown Author',
            title: data.title || 'Unknown Title',
            date: new Date(data.created_at).toLocaleDateString() || 'Unknown Date',
            category: data.category || 'Uncategorized',
            content: data.content || 'No content available',
            image: data.image_url || '',
        });
    } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
    } finally {
        setLoading(false);
    }
};