'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import StepIndicator from '@/components/StepIndicator';
import CartItemCard from '@/components/CartItemCard';
import OrderSummaryCard from '@/components/OrderSummaryCard';

export default function CartClient({ cartData }) {
    const router = useRouter();
    const { state, dispatch, subtotal, grandTotal } = useCart();

    useEffect(() => {
        if (state.cartItems.length === 0 && cartData) {
            dispatch({ type: 'SET_CART', payload: cartData });
        }
    }, [cartData, dispatch, state.cartItems.length]);

    const items = state.cartItems.length > 0 ? state.cartItems : cartData?.cartItems || [];
    const shipping = state.shippingFee || cartData?.shipping_fee || 0;
    const discount = state.discountApplied || cartData?.discount_applied || 0;
    const calcSubtotal = items.reduce((s, i) => s + i.product_price * i.quantity, 0);
    const calcTotal = calcSubtotal + shipping - discount;

    const handleQuantityChange = (productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const handleRemove = (productId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    };

    return (
        <div className="container">
            <header className="page-header animate-fade-in-up">
                <div className="brand-wrapper">
                    <div className="brand">
                        <img
                            src="https://prod-cdn.ecoyaan.com/pb-cs-app/images/ecoyaan-favicon.ico"
                            alt="Ecoyaan Logo"
                            width="28"
                            height="28"
                        />
                        <span className="brand-name">Ecoyaan</span>
                    </div>
                    <span className="brand-tagline">Sustainability made easy</span>
                </div>
            </header>

            <StepIndicator currentStep={1} />

            <div className="section-header animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="section-title">Your Cart</h1>
                <span className="section-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
            </div>

            <div className="cart-list stagger-children">
                {items.map((item) => (
                    <CartItemCard
                        key={item.product_id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                    />
                ))}
            </div>

            {items.length === 0 && (
                <div className="empty-cart glass-card animate-fade-in-up">
                    <p>Your cart is empty.</p>
                </div>
            )}

            {items.length > 0 && (
                <div className="summary-section animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                    <div className="glass-card-accent">
                        <OrderSummaryCard
                            subtotal={calcSubtotal}
                            shippingFee={shipping}
                            discount={discount}
                            grandTotal={calcTotal}
                        />
                    </div>

                    <button
                        className="btn-primary checkout-btn"
                        onClick={() => router.push('/address')}
                    >
                        Proceed to Checkout
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            )}

            <style jsx>{`
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
        }

        .brand-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.04em;
        }

        .brand-tagline {
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        .section-header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .section-count {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 400;
        }

        .cart-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
        }

        .empty-cart {
          padding: 40px;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .summary-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .checkout-btn {
          width: 100%;
          padding: 16px;
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
}
