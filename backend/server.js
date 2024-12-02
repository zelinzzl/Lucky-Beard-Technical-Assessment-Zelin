const express = require('express');
const cors = require('cors');
const { getArticle, getBlogs, createBlog, upload, likeBlog } = require('./api/blogs');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API routes
app.get('/api/blogs/:id', getArticle);
app.get('/api/blogs', getBlogs);
app.post('/api/blogs', upload.single('image'), createBlog);
app.post('/api/blogs/:id/like', likeBlog);
app.post('/api/blogs/:id/unlike', likeBlog);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});