const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const multer = require('multer');  // Middleware for handling file uploads
const path = require('path');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

// Middleware for handling image uploads (using multer)
const storage = multer.memoryStorage();  // Store file in memory
const upload = multer({ storage });

async function getArticle(req, res) {
  try {
    const { id } = req.params;  // Get the article ID from the request parameters

    // Fetch the specific post from Supabase using the ID
    const { data, error } = await supabase
      .from('blogs')  // Assuming the table name is 'blogs'
      .select('id, title, name, category, image_url, content, created_at')  // Select specific fields
      .eq('id', id);  // Filter by ID

    // If there's an error fetching from Supabase
    if (error) {
      throw error;
    }

    // If no data is found for the specified ID
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Send the fetched data as a response
    res.status(200).json(data[0]);  // Assuming the ID is unique, so we return the first item
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send('Error fetching post');
  }
}

// Function to handle fetching blog posts
async function getBlogs(req, res) {
  try {
    const { data, error } = await supabase
      .from('blogs')  // Assuming the table name is 'blogs'
      .select('id, name, title, category, image_url, content, created_at, likes');

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send('Error fetching posts');
  }
}

async function createBlog(req, res) {
  try {
    const { name, title, category, content, cloudImageUrl } = req.body;
    let image_url = '';

    // Check if cloudImageUrl is provided
    if (cloudImageUrl) {
      image_url = cloudImageUrl; // Use the provided URL directly
    } else if (req.file) {
      const { originalname, buffer } = req.file;

      // Upload image to Supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images') // Replace with your bucket name
        .upload(`blogs/${Date.now()}_${originalname}`, buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) {
        throw new Error(`Supabase Upload Error: ${uploadError.message}`);
      }

      // Fetch public URL for uploaded image
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from('images')
        .getPublicUrl(uploadData.path);

      if (publicUrlError) {
        throw new Error(`Supabase URL Error: ${publicUrlError.message}`);
      }

      image_url = publicUrlData.publicUrl;
    }

    // Insert blog data into Supabase
    const { data, error } = await supabase
      .from('blogs')
      .insert([{ name, title, category, image_url, content }])
      .single();

    if (error) {
      throw new Error(`Supabase Insert Error: ${error.message}`);
    }

    res.status(201).json({ message: 'Blog created successfully', blog: data });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog post', error: error.message });
  }
}

async function likeBlog(req, res) {
  try {
    const { id } = req.params;  // Get the blog ID from the request parameters

    // Get the current likes count
    const { data: existingData, error: fetchError } = await supabase
      .from('blogs')
      .select('likes')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    if (!existingData) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const newLikes = existingData.likes + 1;

    // Update the likes count
    const { data, error } = await supabase
      .from('blogs')
      .update({ likes: newLikes })
      .eq('id', id)
      .select('id, likes');

    if (error) throw error;

    res.status(200).json({ message: 'Blog liked successfully', likes: data[0].likes });
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ message: 'Error liking blog', error: error.message });
  }
}

async function unlikeBlog(req, res) {
  try {
    const { id } = req.params;  // Get the blog ID from the request parameters

    // Get the current likes count
    const { data: existingData, error: fetchError } = await supabase
      .from('blogs')
      .select('likes')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    if (!existingData) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Ensure the likes count does not go below 0
    const newLikes = Math.max(existingData.likes - 1, 0);

    // Update the likes count
    const { data, error } = await supabase
      .from('blogs')
      .update({ likes: newLikes })
      .eq('id', id)
      .select('id, likes');

    if (error) throw error;

    res.status(200).json({ message: 'Blog unliked successfully', likes: data[0].likes });
  } catch (error) {
    console.error('Error unliking blog:', error);
    res.status(500).json({ message: 'Error unliking blog', error: error.message });
  }
}

// Export the functions so they can be used in server.js
module.exports = { getArticle, getBlogs, createBlog, upload, likeBlog, unlikeBlog };