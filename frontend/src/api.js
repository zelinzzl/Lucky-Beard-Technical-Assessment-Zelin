import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',  // Make sure this is your backend URL
});

export const getMessage = () => api.get('/');