// backend/api/posts.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function getArticle(req, res) {
  try {
    const { id } = req.params; // Get the article ID from the request parameters

    // Fetch the specific post from Supabase using the ID
    const { data, error } = await supabase
      .from('blogs') // Assuming the table name is 'blogs'
      .select('id, name, category, image_url, content, created_at') // Select specific fields
      .eq('id', id) // Filter by ID

    // If there's an error fetching from Supabase
    if (error) {
      throw error;
    }

    // If no data is found for the specified ID
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Send the fetched data as a response
    res.status(200).json(data[0]); // Assuming the ID is unique, so we return the first item
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send('Error fetching post');
  }
}

// Function to handle fetching blog posts
async function getBlogs(req, res) {
  try {
    // Fetch posts from Supabase (adjust the query as per your needs)
    const { data, error } = await supabase
      .from('blogs') // Assuming the table name is 'blogs'
      .select('id, name, category, image_url, content, created_at') // Select specific fields

    // If there's an error fetching from Supabase
    if (error) {
      throw error;
    }

    // Send the fetched data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send('Error fetching posts');
  }
}

// Function to handle creating a new blog post
async function createBlog(req, res) {
  try {
    const { name, category, image_url, content } = req.body; // Get data from the request body

    // Validate the incoming request data (make sure all required fields are provided)
    if (!name || !category || !content) {
      return res.status(400).json({ message: 'Missing required fields: name, category, content' });
    }

    // Insert the new blog post into the Supabase database
    const { data, error } = await supabase
      .from('blogs') // Table name
      .insert([
        {
          name,
          category,
          image_url: image_url || '', // If image_url is not provided, insert an empty string
          content
        }
      ])
      .single(); // Use .single() to return the inserted row as a single object

    // If there's an error inserting the data
    if (error) {
      throw error;
    }

    // Respond with the created post data
    res.status(201).json(data); // Send the inserted blog post as a response
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).send('Error creating blog post');
  }
}

// Export the functions so they can be used in server.js
module.exports = { getArticle, getBlogs, createBlog };