export const formatNumber = (amount: number) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'usd',
  }).format(amount);
