// backend/server.js
const express = require('express');
const cors = require('cors'); // Import cors
const { getBlogs, createBlog } = require('./api/blogs'); // Import the getBlogs function

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins (or specify allowed origins)
app.use(cors());  // This will allow requests from any domain

// Middleware to parse JSON
app.use(express.json());

// API route to get posts
app.get('/api/blogs', getBlogs);
app.post('/api/blogs', createBlog);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});