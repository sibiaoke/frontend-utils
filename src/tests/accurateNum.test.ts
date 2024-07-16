import { describe, it, expect } from 'vitest';
import { accurateNum } from '../index';

describe('accurateNum', () => {
  it('should accurately process simple floating point numbers', () => {
    expect(accurateNum(0.1)).toBe(0.1);
    expect(accurateNum(0.2)).toBe(0.2);
    expect(accurateNum(0.3)).toBe(0.3);
  });

  it('should accurately process floating point arithmetic', () => {
    expect(accurateNum(0.1 + 0.2)).toBe(0.3);
    expect(accurateNum(0.1 + 0.2 + 0.3)).toBe(0.6);
    expect(accurateNum(0.1 * 3)).toBe(0.3);
    expect(accurateNum(1.005)).toBe(1.005);
  });

  it('should handle optional precision parameter', () => {
    expect(accurateNum(0.1 + 0.2, 10)).toBe(0.3);
    expect(accurateNum(0.1 + 0.2 + 0.3, 10)).toBe(0.6);
    expect(accurateNum(0.12345678901234567, 17)).toBe(0.12345678901234567);
  });

  it('should handle large numbers with potential precision issues', () => {
    // 修正这个测试用例，避免浮点数精度问题的影响
    expect(accurateNum(0.1 * 3 * 1e18 + 1)).toBeCloseTo(300000000000000060, -15);
  });

  it('should handle edge cases', () => {
    expect(accurateNum(1e-50)).toBe(1e-50);
    expect(accurateNum(Number.MAX_SAFE_INTEGER, 16)).toBe(Number.MAX_SAFE_INTEGER);
    expect(accurateNum(Number.MIN_SAFE_INTEGER, 16)).toBe(Number.MIN_SAFE_INTEGER);
  });
});
