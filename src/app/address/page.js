'use client';

import { useState, useEffect } from 'react';
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
  { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', type: 'text', full: true },
  { name: 'email', label: 'Email Address', placeholder: 'johndoe@example.com', type: 'email', full: true },
  { name: 'phone', label: 'Phone Number', placeholder: '9876543210', type: 'tel', full: false },
  { name: 'pinCode', label: 'PIN Code', placeholder: '10001', type: 'text', full: false },
  { name: 'city', label: 'City', placeholder: 'New York', type: 'text', full: false },
  { name: 'state', label: 'State', placeholder: 'NY', type: 'text', full: false },
];

export default function AddressPage() {
  const router = useRouter();
  const { state, dispatch, isInitialized } = useCart();

  const [form, setForm] = useState(state.shippingAddress || initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const savedAddresses = state.savedAddresses || [];

  useEffect(() => {
    if (!isInitialized) return;
    if (savedAddresses.length === 0) {
      setShowNewAddressForm(true);
    } else if (!state.shippingAddress) {
      // Select the first saved address by default if none selected
      dispatch({ type: 'SET_ADDRESS', payload: savedAddresses[0] });
    }
  }, [isInitialized, savedAddresses.length, state.shippingAddress, dispatch, savedAddresses]);

  // Redirect if cart is empty
  if (isInitialized && state.cartItems.length === 0) {
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

  const selectSavedAddress = (address) => {
    dispatch({ type: 'SET_ADDRESS', payload: address });
    setShowNewAddressForm(false);
  };

  const handleProceed = () => {
    if (showNewAddressForm) {
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

      // Save and select the address
      dispatch({ type: 'ADD_SAVED_ADDRESS', payload: form });
      router.push('/confirm');
    } else {
      // Check if an address is selected
      if (state.shippingAddress) {
        router.push('/confirm');
      }
    }
  };

  return (
    <div className="page-wrapper" style={{ opacity: isInitialized ? 1 : 0, transition: 'opacity 0.4s ease' }}>
      <div className="container" style={{ paddingBottom: '120px' }}>
        <header className="page-header animate-fade-in">
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

        <StepIndicator currentStep={2} />

        <div className="section-header animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="section-title">Shipping Address</h1>
        </div>

        {savedAddresses.length > 0 && !showNewAddressForm && (
          <div className="saved-addresses animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {savedAddresses.map((addr, index) => {
              const isSelected = state.shippingAddress &&
                state.shippingAddress.fullName === addr.fullName &&
                state.shippingAddress.phone === addr.phone;

              return (
                <div
                  key={index}
                  className={`address-card glass-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => selectSavedAddress(addr)}
                >
                  <div className="address-header">
                    <b className="address-name">{addr.fullName}</b>
                    <span className="address-type tag">Saved</span>
                    {isSelected && (
                      <div className="check-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="address-body">
                    <p>{addr.city}, {addr.state} - {addr.pinCode}</p>
                    <p>{addr.phone}</p>
                  </div>
                </div>
              );
            })}

            <button
              className="btn-add-new"
              onClick={() => setShowNewAddressForm(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Address
            </button>
          </div>
        )}

        {showNewAddressForm && (
          <div className="new-address-form animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {savedAddresses.length > 0 && (
              <div className="form-header">
                <h3>Add a new address</h3>
                <button className="btn-cancel" onClick={() => setShowNewAddressForm(false)}>
                  Cancel
                </button>
              </div>
            )}
            <div className="form-grid glass-card-accent">
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
          </div>
        )}
      </div>

      <div className="sticky-action-bar animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="action-bar-content">
          <button className="btn-secondary" onClick={() => router.push('/')}>
            Back
          </button>
          <button className="btn-primary" onClick={handleProceed}>
            Continue to Payment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-top: 8px;
          margin-bottom: 24px;
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
        
        /* Saved Addresses Styles */
        .saved-addresses {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .address-card {
          padding: 20px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .address-card.selected {
          border-color: var(--accent);
          background: rgba(52, 211, 153, 0.05);
        }
        
        .address-card.selected::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--accent);
        }
        
        .address-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        
        .address-name {
          font-size: 1.1rem;
          color: var(--text-primary);
        }
        
        .address-type.tag {
          font-size: 0.7rem;
          padding: 2px 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          color: var(--text-secondary);
        }
        
        .check-icon {
          margin-left: auto;
          color: var(--accent);
        }
        
        .address-body {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .btn-add-new {
          background: transparent;
          border: 1px dashed var(--border-subtle);
          border-radius: 12px;
          padding: 20px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-add-new:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: var(--text-muted);
          color: var(--accent);
        }
        
        /* New Address Form Styles */
        .new-address-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .form-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .btn-cancel {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-family: inherit;
          font-size: 0.85rem;
        }
        
        .btn-cancel:hover {
          color: var(--text-primary);
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
        
        /* Sticky Action Bar */
        .sticky-action-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(10, 10, 15, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid var(--border-subtle);
          padding: 20px 0;
          z-index: 100;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
        }
        
        .action-bar-content {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
          gap: 16px;
        }
        
        .action-bar-content .btn-secondary {
          padding: 14px 24px;
        }
        
        .action-bar-content .btn-primary {
          flex: 1;
          max-width: 300px;
        }

        @media (max-width: 640px) {
          .action-bar-content {
            padding: 0 24px;
          }
        }

        @media (max-width: 480px) {
          .form-grid {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 16px;
          }
          
          .action-bar-content .btn-secondary {
            padding: 14px 16px;
          }
        }
      `}</style>
    </div>
  );
}
