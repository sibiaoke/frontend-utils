import { describe, it, expect } from 'vitest';
import { format } from '../currency';

describe('Currency Utilities', () => {
  describe('formatCurrency', () => {
    it('should format currency with default CNY', () => {
      expect(format(1234567.89)).toBe('¥1,234,567.89');
    });

    it('should format currency with USD', () => {
      expect(format(1234567.89, 'USD')).toBe('$1,234,567.89');
    });

    it('should format currency with EUR', () => {
      expect(format(1234567.89, 'EUR')).toBe('1.234.567,89 €');
    });

    it('should format currency with JPY', () => {
      expect(format(1234567.89, 'JPY')).toBe('￥1,234,568');
    });

    it('should format currency with GBP', () => {
      expect(format(1234567.89, 'GBP')).toBe('£1,234,567.89');
    });

    it('should handle negative numbers correctly', () => {
      expect(format(-1234567.89, 'USD')).toBe('-$1,234,567.89');
    });

    it('should handle zero correctly', () => {
      expect(format(0, 'USD')).toBe('$0.00');
    });

    it('should format currency with different locales', () => {
      const formatter = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      expect(formatter.format(1234567.89)).toBe('¥1,234,567.89');
    });
  });
});
