import { describe, it, expect } from 'vitest';
import { greet } from './index';

describe('greet', () => {
  it('should greet a person with their name', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});
