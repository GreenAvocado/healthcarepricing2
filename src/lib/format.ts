const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(amount?: number | null): string {
  if (amount === undefined || amount === null) return 'N/A';
  return currencyFormatter.format(amount);
}
