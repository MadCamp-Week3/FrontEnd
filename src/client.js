import axios from 'axios';
axios.defaults.withCredentials = true;
// const BASE_URL = 'https://1e23-192-249-19-234.ngrok.io/'; // Replace with your API base URL
const BASE_URL = 'http://127.0.0.1:8000/';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
