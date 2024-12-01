const express = require('express');
const cors = require('cors');
const { getArticle, getBlogs, createBlog, upload } = require('./api/blogs');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API routes
app.get('/api/blogs/:id', getArticle);
app.get('/api/blogs', getBlogs);

// Use the `upload.single` middleware for handling a single file upload with the key `image`
app.post('/api/blogs', upload.single('image'), createBlog);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});