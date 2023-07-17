import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/'; // Replace with your API base URL

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
