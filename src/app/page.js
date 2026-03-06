import CartClient from './CartClient';

async function getCartData() {
  // Using absolute URL for server-side fetch in development,
  // but in production this would use the deployed URL.
  // We inline the data directly for reliable SSR.
  const cartData = {
    cartItems: [
      {
        product_id: 101,
        product_name: 'Bamboo Toothbrush (Pack of 4)',
        product_price: 299,
        quantity: 2,
        image: 'https://via.placeholder.com/150',
      },
      {
        product_id: 102,
        product_name: 'Reusable Cotton Produce Bags',
        product_price: 450,
        quantity: 1,
        image: 'https://via.placeholder.com/150',
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };

  // Simulate async data fetching (as if hitting a DB or external API)
  await new Promise((resolve) => setTimeout(resolve, 0));
  return cartData;
}

export default async function CartPage() {
  const cartData = await getCartData();

  return <CartClient cartData={cartData} />;
}
