'use client';

import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = {
  cartItems: [],
  shippingFee: 0,
  discountApplied: 0,
  shippingAddress: null,
  orderPlaced: false,
  orderId: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload.cartItems,
        shippingFee: action.payload.shipping_fee,
        discountApplied: action.payload.discount_applied,
      };

    case 'UPDATE_QUANTITY': {
      const updated = state.cartItems.map((item) =>
        item.product_id === action.payload.productId
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      return { ...state, cartItems: updated };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product_id !== action.payload.productId
        ),
      };

    case 'SET_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case 'PLACE_ORDER':
      return {
        ...state,
        orderPlaced: true,
        orderId: 'ECO-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const subtotal = state.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const grandTotal = subtotal + state.shippingFee - state.discountApplied;

  return (
    <CartContext.Provider value={{ state, dispatch, subtotal, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
