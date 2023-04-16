export const formatNumber = (amount: number, currency?: string) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency || 'usd',
  }).format(amount);
