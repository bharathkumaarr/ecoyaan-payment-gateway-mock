'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function SuccessPage() {
  const router = useRouter();
  const { state, dispatch, isInitialized } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const orderId = state.orderId || 'ECO-XXXXXX';

  const handleBackToCart = () => {
    dispatch({ type: 'RESET' });
    router.push('/');
  };

  if (!isInitialized || !mounted) return null;

  return (
    <div className="container success-container" style={{ opacity: isInitialized ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      {/* Decorative background circles */}
      <div className="bg-circle circle-1" />
      <div className="bg-circle circle-2" />
      <div className="bg-circle circle-3" />

      <div className="success-content animate-scale-in">
        {/* Animated checkmark */}
        <div className="check-wrapper">
          <div className="check-ring" />
          <div className="check-circle">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="check-icon"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h1 className="success-title">Order Confirmed!</h1>
        <p className="success-subtitle">
          Thank you for choosing sustainable products.
          <br />
          Your order is being prepared.
        </p>

        <div className="order-id-card glass-card-accent">
          <span className="order-id-label">Order ID</span>
          <span className="order-id-value">{orderId}</span>
        </div>

        <div className="success-details glass-card">
          <div className="detail-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <rect x="1" y="3" width="22" height="18" rx="2" ry="2" />
              <line x1="1" y1="9" x2="23" y2="9" />
            </svg>
            <span>Payment received successfully</span>
          </div>
          <div className="detail-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span>Tracking details will be sent to your email</span>
          </div>
          <div className="detail-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Estimated delivery in 3-5 business days</span>
          </div>
        </div>

        <div className="success-actions">
          <button className="btn-primary" onClick={handleBackToCart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Cart
          </button>
        </div>

        <p className="eco-footer">
          🌿 You just made the planet a little greener
        </p>
      </div>

      <style jsx>{`
        .success-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.03;
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -100px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: -60px;
          left: -60px;
          animation-delay: -2s;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          right: 10%;
          animation-delay: -4s;
        }

        .success-content {
          position: relative;
          z-index: 1;
          max-width: 440px;
          width: 100%;
        }

        .check-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 28px;
        }

        .check-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid var(--accent-glow);
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .check-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px var(--accent-glow);
        }

        .check-icon {
          color: #0a0a0f;
          stroke-dasharray: 50;
          animation: checkDraw 0.8s ease 0.3s forwards;
        }

        .success-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .success-subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .order-id-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .order-id-label {
          font-size: 0.65rem;
          font-weight: 500;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .order-id-value {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.08em;
        }

        .success-details {
          padding: 20px;
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-align: left;
        }

        .success-actions {
          margin-bottom: 24px;
        }

        .success-actions .btn-primary {
          padding: 14px 40px;
        }

        .eco-footer {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }
      `}</style>
    </div>
  );
}
