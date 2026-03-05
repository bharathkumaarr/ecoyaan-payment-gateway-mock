'use client';

const steps = [
    { number: 1, label: 'Cart' },
    { number: 2, label: 'Address' },
    { number: 3, label: 'Payment' },
];

export default function StepIndicator({ currentStep }) {
    return (
        <div className="step-indicator">
            <div className="step-track">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.number;
                    const isActive = currentStep === step.number;

                    return (
                        <div key={step.number} className="step-item-wrapper">
                            <div className="step-item">
                                <div
                                    className={`step-circle ${isCompleted ? 'completed' : isActive ? 'active' : 'pending'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <span>{step.number}</span>
                                    )}
                                </div>
                                <span
                                    className={`step-label ${isActive ? 'active' : isCompleted ? 'completed' : 'pending'
                                        }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div className={`step-connector ${isCompleted ? 'completed' : ''}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
        .step-indicator {
          padding: 32px 0 40px;
        }

        .step-track {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }

        .step-item-wrapper {
          display: flex;
          align-items: center;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .step-circle.active {
          background: var(--accent);
          color: #0a0a0f;
          box-shadow: 0 0 20px var(--accent-glow), 0 0 40px rgba(52, 211, 153, 0.1);
        }

        .step-circle.completed {
          background: var(--accent);
          color: #0a0a0f;
        }

        .step-circle.pending {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
        }

        .step-label {
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          transition: color 0.3s;
        }

        .step-label.active {
          color: var(--accent);
        }

        .step-label.completed {
          color: var(--text-secondary);
        }

        .step-label.pending {
          color: var(--text-muted);
        }

        .step-connector {
          width: 60px;
          height: 1px;
          background: var(--border-subtle);
          margin: 0 16px;
          margin-bottom: 28px;
          transition: background 0.4s;
        }

        .step-connector.completed {
          background: var(--accent);
        }

        @media (max-width: 480px) {
          .step-connector {
            width: 32px;
            margin: 0 8px;
          }
          .step-label {
            font-size: 0.55rem;
          }
          .step-circle {
            width: 30px;
            height: 30px;
            font-size: 0.65rem;
          }
        }
      `}</style>
        </div>
    );
}
