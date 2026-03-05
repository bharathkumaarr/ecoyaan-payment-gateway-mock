'use client';

export default function OrderSummaryCard({ subtotal, shippingFee, discount, grandTotal, compact }) {
    const rows = [
        { label: 'Subtotal', value: subtotal, accent: false },
        { label: 'Shipping', value: shippingFee, accent: false },
    ];

    if (discount > 0) {
        rows.push({ label: 'Discount', value: -discount, accent: false });
    }

    return (
        <div className={`summary-card ${compact ? 'compact' : ''}`}>
            <div className="summary-rows">
                {rows.map((row) => (
                    <div key={row.label} className="summary-row">
                        <span className="summary-label">{row.label}</span>
                        <span className="summary-value">
                            {row.value < 0 ? '−' : ''}₹{Math.abs(row.value)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row total">
                <span className="summary-label">Grand Total</span>
                <span className="summary-total-value">₹{grandTotal}</span>
            </div>

            <style jsx>{`
        .summary-card {
          padding: ${compact ? '0' : '24px'};
        }

        .summary-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .summary-value {
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .summary-divider {
          height: 1px;
          background: var(--border-subtle);
          margin: 16px 0;
        }

        .summary-row.total .summary-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .summary-total-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent);
        }
      `}</style>
        </div>
    );
}
