import axios from 'axios';

const API_TOKEN = 'SharedAccessSignature sr=f2a06a85-3e15-4e0f-b657-0ff19eec4b40&sig=N7bMZAOJeiz4r3qDD4ZC%2BPC1Yj4D0EBqTFChNlBOz0M%3D&skn=MiAppToken&se=1794627546024';

const API_BASE_URL = 'https://backendiot.azureiotcentral.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${API_TOKEN}`
  },
  params: {
    'api-version': '2022-07-31'
  }
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Error en la llamada de API:', error.message);
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
      if (error.response.status === 401) {
        console.error('Error 401: Token de API inválido o expirado.');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;