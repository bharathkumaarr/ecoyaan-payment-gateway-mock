'use client';

export default function CartItemCard({ item, onQuantityChange, onRemove }) {
    return (
        <div className="cart-item glass-card">
            <div className="cart-item-image">
                <img
                    src={item.image}
                    alt={item.product_name}
                    width={80}
                    height={80}
                />
            </div>

            <div className="cart-item-details">
                <div className="cart-item-header">
                    <h3 className="cart-item-name">{item.product_name}</h3>
                    <span className="mono-tag">id:{item.product_id}</span>
                </div>

                <div className="cart-item-footer">
                    <div className="cart-item-quantity">
                        <button
                            className="qty-btn"
                            onClick={() => onQuantityChange(item.product_id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                            className="qty-btn"
                            onClick={() => onQuantityChange(item.product_id, item.quantity + 1)}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <div className="cart-item-pricing">
                        <span className="cart-item-unit-price">₹{item.product_price} × {item.quantity}</span>
                        <span className="cart-item-total">₹{item.product_price * item.quantity}</span>
                    </div>
                </div>
            </div>

            {onRemove && (
                <button
                    className="cart-item-remove"
                    onClick={() => onRemove(item.product_id)}
                    aria-label="Remove item"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}

            <style jsx>{`
        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          position: relative;
        }

        .cart-item-image {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
        }

        .cart-item-details {
          flex: 1;
          min-width: 0;
        }

        .cart-item-header {
          margin-bottom: 12px;
        }

        .cart-item-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 4px;
        }

        .cart-item-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          overflow: hidden;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'JetBrains Mono', monospace;
        }

        .qty-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .qty-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .qty-value {
          width: 36px;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          border-left: 1px solid var(--border-subtle);
          border-right: 1px solid var(--border-subtle);
          line-height: 32px;
        }

        .cart-item-pricing {
          text-align: right;
        }

        .cart-item-unit-price {
          display: block;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .cart-item-total {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--accent);
        }

        .cart-item-remove {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .cart-item-remove:hover {
          background: var(--error-dim);
          color: var(--error);
        }

        @media (max-width: 480px) {
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 16px;
          }

          .cart-item-image {
            width: 60px;
            height: 60px;
          }

          .cart-item-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .cart-item-pricing {
            text-align: left;
          }
        }
      `}</style>
        </div>
    );
}
