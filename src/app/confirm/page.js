'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import StepIndicator from '@/components/StepIndicator';
import OrderSummaryCard from '@/components/OrderSummaryCard';

export default function ConfirmPage() {
  const router = useRouter();
  const { state, dispatch, subtotal, grandTotal } = useCart();
  const [processing, setProcessing] = useState(false);

  // Redirect if no address or cart is empty
  if (!state.shippingAddress || state.cartItems.length === 0) {
    if (typeof window !== 'undefined') {
      router.replace('/');
    }
    return null;
  }

  const address = state.shippingAddress;

  const handlePay = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch({ type: 'PLACE_ORDER' });
    router.push('/success');
  };

  return (
    <div className="container" style={{ paddingBottom: '120px' }}>
      <header className="page-header animate-fade-in-up">
        <button className="btn-back" onClick={() => router.push('/address')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        <div className="brand-container">
          <img
            src="https://prod-cdn.ecoyaan.com/pb-cs-app/images/ecoyaan-favicon.ico"
            alt="Ecoyaan Logo"
            className="brand-logo"
          />
          <div className="brand-text">
            <span className="brand-name">Ecoyaan</span>
            <span className="brand-tagline">Sustainability made easy</span>
          </div>
        </div>
      </header>

      <StepIndicator currentStep={3} />

      <div className="section-header animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="section-title">Review & Pay</h1>
      </div>

      {/* Order Items */}
      <div className="glass-card review-section animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        <h2 className="review-heading">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          Order Items
        </h2>
        {state.cartItems.map((item) => (
          <div key={item.product_id} className="review-item">
            <div className="review-item-info">
              <span className="review-item-name">{item.product_name}</span>
              <span className="review-item-qty">Qty: {item.quantity}</span>
            </div>
            <span className="review-item-price">₹{item.product_price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div className="glass-card review-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="review-heading">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Shipping Address
        </h2>
        <div className="address-details">
          <p className="address-name">{address.fullName}</p>
          <p className="address-line">{address.email}</p>
          <p className="address-line">{address.phone}</p>
          <p className="address-line">
            {address.city}, {address.state} — {address.pinCode}
          </p>
        </div>
      </div>

      {/* Order Total */}
      <div className="glass-card-accent review-section animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        <OrderSummaryCard
          subtotal={subtotal}
          shippingFee={state.shippingFee}
          discount={state.discountApplied}
          grandTotal={grandTotal}
        />
      </div>

      {/* Pay Button */}
      <div className="sticky-action-bar animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="action-bar-content">
          <button className="btn-secondary" onClick={() => router.push('/address')}>
            Back
          </button>
          <button
            className={`btn-primary pay-btn ${processing ? 'processing' : ''}`}
            onClick={handlePay}
            disabled={processing}
          >
            {processing ? (
              <>
                <span className="spinner" />
                Processing...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Pay Securely — ₹{grandTotal}
              </>
            )}
          </button>
        </div>
      </div>

      <p className="security-note animate-fade-in" style={{ animationDelay: '0.35s' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Secured with 256-bit encryption. Your data is safe.
      </p>

      <style jsx>{`
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
        }

        .btn-back:hover {
          color: var(--text-primary);
        }

        .brand-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .brand-tagline {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1;
        }

        .section-header {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .review-section {
          padding: 24px;
          margin-bottom: 16px;
        }

        .review-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .review-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .review-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .review-item:first-of-type {
          padding-top: 0;
        }

        .review-item-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .review-item-name {
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .review-item-qty {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .review-item-price {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent);
        }

        .address-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .address-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .address-line {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .pay-btn.processing {
          opacity: 0.8;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(10, 10, 15, 0.3);
          border-top-color: #0a0a0f;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 16px;
          font-size: 0.65rem;
          color: var(--text-muted);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
