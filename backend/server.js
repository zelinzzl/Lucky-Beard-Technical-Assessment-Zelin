const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const apiRoutes = require('./routes/api');

dotenv.config(); // Loads environment variables from a .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});