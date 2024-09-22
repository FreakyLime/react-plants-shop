import reducer, { addItem, removeItem, updateQuantity } from './cartSlice';

describe('CartSlice', () => {
  const initialState = { items: [] };

  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should add an item to the cart', () => {
    const item = { id: 1, name: 'Product 1', image: 'image1.png', cost: 100, sale: 80 };
    const nextState = reducer(initialState, addItem(item));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual({ ...item, quantity: 1 });
  });

  test('should increment the quantity if the item already exists', () => {
    const item = { id: 1, name: 'Product 1', image: 'image1.png', cost: 100, sale: 80 };
    const stateWithItem = reducer(initialState, addItem(item));
    const nextState = reducer(stateWithItem, addItem(item));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].quantity).toBe(2);
  });

  test('should remove an item from the cart', () => {
    const item = { id: 1, name: 'Product 1', image: 'image1.png', cost: 100, sale: 80 };
    const stateWithItem = reducer(initialState, addItem(item));
    const nextState = reducer(stateWithItem, removeItem(item.id));

    expect(nextState.items).toHaveLength(0);
  });

  test('should not remove an item that does not exist', () => {
    const item = { id: 1, name: 'Product 1', image: 'image1.png', cost: 100, sale: 80 };
    const stateWithItem = reducer(initialState, addItem(item));
    const nextState = reducer(stateWithItem, removeItem(999));

    expect(nextState.items).toHaveLength(1);
  });

  test('should update the quantity of an item', () => {
    const item = { id: 1, name: 'Product 1', image: 'image1.png', cost: 100, sale: 80 };
    const stateWithItem = reducer(initialState, addItem(item));
    const nextState = reducer(stateWithItem, updateQuantity({ id: item.id, quantity: 3 }));

    expect(nextState.items[0].quantity).toBe(3);
  });

  test('should not update quantity to less than 1', () => {
    const item = { id: 1, name: 'Product 1', image: 'image1.png', cost: 100, sale: 80 };
    const stateWithItem = reducer(initialState, addItem(item));
    const nextState = reducer(stateWithItem, updateQuantity({ id: item.id, quantity: 0 }));

    expect(nextState.items[0].quantity).toBe(1);
  });
});
