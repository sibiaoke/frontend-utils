import { describe, it, expect } from 'vitest';
import { camelToKebab, kebabToCamel } from '../naming';

describe('Naming Utilities', () => {

  describe('camelToKebab', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(camelToKebab('camelCaseString')).toBe('camel-case-string');
      expect(camelToKebab('camelCase')).toBe('camel-case');
      expect(camelToKebab('thisIsATest')).toBe('this-is-a-test');
    });

    it('should return the same string if there are no uppercase letters', () => {
      expect(camelToKebab('nocamelcase')).toBe('nocamelcase');
    });

    it('should handle empty strings', () => {
      expect(camelToKebab('')).toBe('');
    });
  });

  describe('kebabToCamel', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(kebabToCamel('kebab-case-string')).toBe('kebabCaseString');
      expect(kebabToCamel('kebab-case')).toBe('kebabCase');
      expect(kebabToCamel('this-is-a-test')).toBe('thisIsATest');
    });

    it('should return the same string if there are no hyphens', () => {
      expect(kebabToCamel('nokebabcase')).toBe('nokebabcase');
    });

    it('should handle empty strings', () => {
      expect(kebabToCamel('')).toBe('');
    });
  });

});
