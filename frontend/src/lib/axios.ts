import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


// Interceptor de solicitud para agregar el token de autenticación
apiClient.interceptors.request.use(
    (config) => {
      // Si tienes un token en el almacenamiento local, puedes agregarlo aquí
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Interceptor de respuesta para manejar errores globales
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Manejo de errores de autenticación, por ejemplo
        console.error("No estás autenticado. Redireccionando a login...");
        // Aquí podrías redirigir al usuario a la página de login
      }
      return Promise.reject(error);
    }
  );
  
  export default apiClient;