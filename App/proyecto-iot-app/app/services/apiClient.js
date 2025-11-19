import axios from 'axios';

const API_BASE_URL = 'https://us-central1-proyecto-iot-a7f6f.cloudfunctions.net';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Error en la llamada de API:', error.message);
    return Promise.reject(error);
  }
);

export default apiClient;