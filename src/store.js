import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Reducers/CartSlice';

 const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
export default store