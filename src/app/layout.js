import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Ecoyaan - Sustainable Checkout',
  description: 'Complete your eco-friendly purchase with Ecoyaan. Sustainable products for a better planet.',
  keywords: ['ecoyaan', 'sustaaddinable', 'eco-friendly', 'checkout', 'green shopping'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <div className="page-wrapper">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
