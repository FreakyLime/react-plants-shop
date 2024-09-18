import api from './api';

export const fetchProducts = async () => {
    const response = await api.get('/e1b456fc5466df0b94704cab04d7bef4/raw/9d4ee8ea770794ece53ac82b517d547c2179e995/react-plants-shop-products');
    return response.data;
};