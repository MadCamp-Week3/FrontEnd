import axios from 'axios';

const BASE_URL = 'http://my-json-server.typicode.com/Djindog/dbJson'; // Replace with your API base URL

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;
