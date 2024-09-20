import api from './api';

export const fetchProducts = async () => {
    const response = await api.get('/71d34a1162fc92136486beee17de7b40/raw/f67932a60e1ca4793806f4b33f57a6fcce73b9e2/react-plants-shop-products-v3.json');
    return response.data;
};