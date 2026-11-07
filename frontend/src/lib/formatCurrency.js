// src/lib/formatCurrency.js
import { SITE } from '../config/siteConfig';

export const formatCurrency = (amount, currency = SITE.currency) => {
  const value = Number(amount) || 0;
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `${SITE.currencySymbol}${value.toFixed(0)}`;
  }
};
