import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gist.githubusercontent.com/FreakyLime/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error(`Error ${error.response.status}: ${error.response.data.message}`);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
