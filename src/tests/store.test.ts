import { describe, it, expect, beforeEach } from 'vitest';
import store from '../store';

describe('Store', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should store and retrieve values from localStorage', () => {
    store.local.set('key', 'value');
    const result = store.local.get('key');
    expect(result).toBe('value');
  });

  it('should store and retrieve values from sessionStorage', () => {
    store.session.set('key', 'value');
    const result = store.session.get('key');
    expect(result).toBe('value');
  });

  it('should handle JSON values correctly in localStorage', () => {
    const value = { foo: 'bar' };
    store.local.set('obj', value);
    const result = store.local.get('obj');
    expect(result).toEqual(value);
  });

  it('should handle JSON values correctly in sessionStorage', () => {
    const value = { foo: 'bar' };
    store.session.set('obj', value);
    const result = store.session.get('obj');
    expect(result).toEqual(value);
  });

  it('should create a namespaced store instance', () => {
    const namespacedStore = store.namespace('test');
    namespacedStore.local.set('key', 'value');
    const result = namespacedStore.local.get('key');
    expect(result).toBe('value');
  });

  it('should not conflict between different namespaces', () => {
    const storeA = store.namespace('A');
    const storeB = store.namespace('B');

    storeA.local.set('key', 'valueA');
    storeB.local.set('key', 'valueB');

    expect(storeA.local.get('key')).toBe('valueA');
    expect(storeB.local.get('key')).toBe('valueB');
  });

  it('should remove items correctly from localStorage', () => {
    store.local.set('key', 'value');
    store.local.remove('key');
    const result = store.local.get('key');
    expect(result).toBeNull();
  });

  it('should clear all items from localStorage', () => {
    store.local.set('key1', 'value1');
    store.local.set('key2', 'value2');
    store.local.clear();
    expect(store.local.get('key1')).toBeNull();
    expect(store.local.get('key2')).toBeNull();
  });

  it('should store and retrieve values from pageStorage', () => {
    store.page.set('key', 'value');
    const result = store.page.get('key');
    expect(result).toBe('value');
  });

  it('should handle JSON values correctly in pageStorage', () => {
    const value = { foo: 'bar' };
    store.page.set('obj', value);
    const result = store.page.get('obj');
    expect(result).toEqual(value);
  });

  it('should remove items correctly from pageStorage', () => {
    store.page.set('key', 'value');
    store.page.remove('key');
    const result = store.page.get('key');
    expect(result).toBeNull();
  });

  it('should clear all items from pageStorage', () => {
    store.page.set('key1', 'value1');
    store.page.set('key2', 'value2');
    store.page.clear();
    expect(store.page.get('key1')).toBeNull();
    expect(store.page.get('key2')).toBeNull();
  });
});
