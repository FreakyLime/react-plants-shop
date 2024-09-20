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
      const { name, image, cost, sale } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, cost, sale, quantity: 1 });
      }

      saveCartToLocalStorage(state.items);
    },

    removeItem: (state, action) => {
      const itemName = action.payload;
      console.log("Removing item:", itemName);
      const updatedItems = state.items.filter(item => item.name !== itemName);

      if (updatedItems.length === state.items.length) {
        console.warn(`Item with name "${itemName}" not found.`);
      } else {
        console.log("Item removed successfully.");
        state.items = updatedItems;
        saveCartToLocalStorage(state.items);
      }
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const quantityNumber = Number(quantity);
      if (isNaN(quantityNumber) || quantityNumber < 1) {
        console.error("Invalid quantity value");
        return;
      }

      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantityNumber;
        saveCartToLocalStorage(state.items);
      } else {
        console.warn(`Item with name "${name}" not found.`);
      }
    },
  },
});

export default CartSlice.reducer;
