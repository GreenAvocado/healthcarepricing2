import { describe, it, expect } from 'vitest';
import { formatCurrency } from './format';

describe('formatCurrency', () => {
  it('formats a whole dollar amount', () => {
    expect(formatCurrency(1500)).toBe('$1,500.00');
  });

  it('formats cents correctly', () => {
    expect(formatCurrency(99.5)).toBe('$99.50');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('returns N/A for null', () => {
    expect(formatCurrency(null)).toBe('N/A');
  });

  it('returns N/A for undefined', () => {
    expect(formatCurrency(undefined)).toBe('N/A');
  });
});
