# Ecoyaan Checkout Flow

A simplified checkout flow built with **Next.js 14** (App Router), featuring dark mode, monospace typography, glassmorphism design, and server-side rendering.

---

## Features

- **Server-Side Rendering** — Cart data is fetched asynchronously in a Server Component, demonstrating Next.js SSR
- **3-Step Checkout Flow** — Cart → Shipping Address → Confirm & Pay → Success
- **Form Validation** — Real-time field-level validation with inline error messages (email regex, 10-digit phone, 6-digit PIN)
- **State Management** — React Context API with `useReducer` for predictable state transitions across all pages
- **Micro-Animations** — Fade-in-up stagger effects, animated checkmark on success, pulsing ring, floating backgrounds
- **Responsive** — Adapts cleanly from desktop (780px container) to mobile (single-column layout)
- **Mock API** — Next.js API route (`/api/cart`) serving the provided product data

---

## Architecture

```
src/
├── app/
│   ├── api/cart/route.js       # Mock API endpoint (GET)
│   ├── layout.js               # Root layout — fonts, metadata, CartProvider
│   ├── globals.css             # Design system — dark theme, animations, components
│   ├── page.js                 # Cart page — Server Component (SSR)
│   ├── CartClient.js           # Cart page — Client Component (interactivity)
│   ├── address/page.js         # Shipping address form with validation
│   ├── confirm/page.js         # Order review + simulated payment
│   └── success/page.js         # Animated success screen
├── components/
│   ├── StepIndicator.js        # 3-step progress bar
│   ├── CartItemCard.js         # Product card with quantity controls
│   └── OrderSummaryCard.js     # Subtotal / shipping / total breakdown
└── context/
    └── CartContext.js           # React Context + useReducer
```


## Getting Started

### Prerequisites

- Node.js 18+ (tested on v20)
- npm

### Install & Run

```bash
# Clone the repo
git clone <your-repo-url>
cd payments

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Flow Walkthrough

1. **Cart** (`/`) — View products, adjust quantities, see order total
2. **Address** (`/address`) — Fill shipping details with real-time validation
3. **Confirm** (`/confirm`) — Review order + address, click "Pay Securely"
4. **Success** (`/success`) — Animated confirmation with order ID

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (ES2022)
- **Styling**: CSS Variables + Tailwind CSS (base) + Styled JSX (scoped)
- **State**: React Context API + useReducer

---

## License

MIT
