import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.warn("Failed to load cart from localStorage", e);
    return [];
  }
};

const saveCartToLocalStorage = (items) => {
  try {
    const serializedCart = JSON.stringify(items);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, image, cost, sale } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, name, image, cost, sale, quantity: 1 });
      }

      saveCartToLocalStorage(state.items);
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      const updatedItems = state.items.filter(item => item.id !== itemId);

      if (updatedItems.length === state.items.length) {
        console.warn(`Item with name "${itemId}" not found.`);
      } else {
        state.items = updatedItems;
        saveCartToLocalStorage(state.items);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const quantityNumber = Number(quantity);
      if (isNaN(quantityNumber) || quantityNumber < 1) {
        return;
      }

      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantityNumber;
        saveCartToLocalStorage(state.items);
      }
    },
  },
});

export default CartSlice.reducer;
