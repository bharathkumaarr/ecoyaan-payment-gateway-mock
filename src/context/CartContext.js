'use client';

import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext(null);

const initialState = {
  cartItems: [],
  shippingFee: 0,
  discountApplied: 0,
  shippingAddress: null,
  savedAddresses: [],
  orderPlaced: false,
  orderId: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return action.payload;

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

    case 'ADD_SAVED_ADDRESS': {
      const newAddress = action.payload;
      const existingIndex = state.savedAddresses.findIndex(
        (addr) =>
          addr.fullName === newAddress.fullName &&
          addr.email === newAddress.email &&
          addr.phone === newAddress.phone &&
          addr.pinCode === newAddress.pinCode &&
          addr.city === newAddress.city &&
          addr.state === newAddress.state
      );
      if (existingIndex >= 0) {
        return {
          ...state,
          shippingAddress: newAddress,
        };
      }
      return {
        ...state,
        savedAddresses: [...state.savedAddresses, newAddress],
        shippingAddress: newAddress,
      };
    }

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
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('ecoyaan_checkout_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'INIT_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('ecoyaan_checkout_state', JSON.stringify(state));
    }
  }, [state, isInitialized]);

  const subtotal = state.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const grandTotal = subtotal + state.shippingFee - state.discountApplied;

  return (
    <CartContext.Provider value={{ state, dispatch, subtotal, grandTotal, isInitialized }}>
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
