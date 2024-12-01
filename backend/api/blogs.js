const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const multer = require('multer'); // Middleware for handling file uploads
const path = require('path');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

// Middleware for handling image uploads (using multer)
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

async function getArticle(req, res) {
  try {
    const { id } = req.params; // Get the article ID from the request parameters

    // Fetch the specific post from Supabase using the ID
    const { data, error } = await supabase
      .from('blogs') // Assuming the table name is 'blogs'
      .select('id, title, name, category, image_url, content, created_at') // Select specific fields
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
      .select('id, name, title, category, image_url, content, created_at') // Select specific fields

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

async function createBlog(req, res) {
  try {
    // Use multer to parse the body for file uploads
    const { name, title, category, content } = req.body;
    let image_url = '';

    // Check if a file was uploaded and handle it
    if (req.file) {
      const { originalname, buffer } = req.file;

      // Upload the image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images') // Replace with your Supabase storage bucket name
        .upload(`blogs/${Date.now()}_${originalname}`, buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(uploadData.path);
      image_url = publicUrlData.publicUrl;
    }

    // Insert the blog post data, including the title and image_url
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          name,
          title,
          category,
          image_url,
          content,
        },
      ])
      .single();

    if (error) {
      throw error;
    }

    // Respond with the created blog post data
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: 'Error creating blog post', error: error.message });
  }
}

// Export the functions so they can be used in server.js
module.exports = { getArticle, getBlogs, createBlog, upload };