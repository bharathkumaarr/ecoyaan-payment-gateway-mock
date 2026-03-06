'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import StepIndicator from '@/components/StepIndicator';

const initialForm = {
    fullName: '',
    email: '',
    phone: '',
    pinCode: '',
    city: '',
    state: '',
};

const validators = {
    fullName: (v) => (v.trim().length < 2 ? 'Name must be at least 2 characters' : ''),
    email: (v) =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email address' : '',
    phone: (v) =>
        !/^\d{10}$/.test(v.replace(/\s/g, '')) ? 'Phone must be exactly 10 digits' : '',
    pinCode: (v) =>
        !/^\d{6}$/.test(v.replace(/\s/g, '')) ? 'PIN code must be exactly 6 digits' : '',
    city: (v) => (v.trim().length < 2 ? 'City is required' : ''),
    state: (v) => (v.trim().length < 2 ? 'State is required' : ''),
};

const fieldConfig = [
    { name: 'fullName', label: 'Full Name', placeholder: 'Bharath Kumar', type: 'text', full: true },
    { name: 'email', label: 'Email Address', placeholder: 'bharath@example.com', type: 'email', full: true },
    { name: 'phone', label: 'Phone Number', placeholder: '9876543210', type: 'tel', full: false },
    { name: 'pinCode', label: 'PIN Code', placeholder: '560001', type: 'text', full: false },
    { name: 'city', label: 'City', placeholder: 'Bengaluru', type: 'text', full: false },
    { name: 'state', label: 'State', placeholder: 'Karnataka', type: 'text', full: false },
];

export default function AddressPage() {
    const router = useRouter();
    const { state, dispatch } = useCart();
    const [form, setForm] = useState(state.shippingAddress || initialForm);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Redirect if cart is empty
    if (state.cartItems.length === 0) {
        if (typeof window !== 'undefined') {
            router.replace('/');
        }
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validators[name](value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validators[name](value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        let hasError = false;

        Object.keys(validators).forEach((field) => {
            const error = validators[field](form[field]);
            if (error) {
                newErrors[field] = error;
                hasError = true;
            }
        });

        setErrors(newErrors);
        setTouched(Object.fromEntries(Object.keys(validators).map((k) => [k, true])));

        if (hasError) return;

        dispatch({ type: 'SET_ADDRESS', payload: form });
        router.push('/confirm');
    };

    return (
        <div className="container">
            <header className="page-header animate-fade-in-up">
                <button className="btn-back" onClick={() => router.push('/')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back
                </button>
                <span className="brand-name">ecoyaan</span>
            </header>

            <StepIndicator currentStep={2} />

            <div className="section-header animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="section-title">Shipping Address</h1>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid glass-card-accent animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    {fieldConfig.map((field) => (
                        <div key={field.name} className={`form-group ${field.full ? 'full' : ''}`}>
                            <label className="form-label" htmlFor={field.name}>
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={form[field.name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-input ${errors[field.name] && touched[field.name] ? 'error' : ''}`}
                                autoComplete="off"
                            />
                            {errors[field.name] && touched[field.name] && (
                                <span className="form-error">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    {errors[field.name]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn-primary submit-btn animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                    Continue to Payment
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
            </form>

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

        .brand-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.04em;
        }

        .section-header {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 28px;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .submit-btn {
          width: 100%;
          margin-top: 24px;
          padding: 16px;
          font-size: 0.9rem;
        }

        @media (max-width: 480px) {
          .form-grid {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 16px;
          }
        }
      `}</style>
        </div>
    );
}
