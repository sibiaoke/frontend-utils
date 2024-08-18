import { describe, it, expect, beforeEach } from 'vitest';
import store from '../store';

describe('Store', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should store and retrieve values from localStorage', () => {
    store.local('key', 'value');
    const result = store.local('key');
    expect(result).toBe('value');
  });

  it('should store and retrieve values from sessionStorage', () => {
    store.session('key', 'value');
    const result = store.session('key');
    expect(result).toBe('value');
  });

  it('should handle JSON values correctly in localStorage', () => {
    const value = { foo: 'bar' };
    store.local('obj', value);
    const result = store.local('obj');
    expect(result).toEqual(value);
  });

  it('should handle JSON values correctly in sessionStorage', () => {
    const value = { foo: 'bar' };
    store.session('obj', value);
    const result = store.session('obj');
    expect(result).toEqual(value);
  });

  it('should create a namespaced store instance', () => {
    const namespacedStore = store.namespace('test');
    namespacedStore.local('key', 'value');
    const result = namespacedStore.local('key');
    expect(result).toBe('value');
  });

  it('should not conflict between different namespaces', () => {
    const storeA = store.namespace('A');
    const storeB = store.namespace('B');

    storeA.local('key', 'valueA');
    storeB.local('key', 'valueB');

    expect(storeA.local('key')).toBe('valueA');
    expect(storeB.local('key')).toBe('valueB');
  });

  it('should remove items correctly from localStorage', () => {
    store.local('key', 'value');
    store.local.remove('key');
    const result = store.local('key');
    expect(result).toBeNull();
  });

  it('should clear all items from localStorage', () => {
    store.local('key1', 'value1');
    store.local('key2', 'value2');
    store.local.clear();
    expect(store.local('key1')).toBeNull();
    expect(store.local('key2')).toBeNull();
  });

  it('should store and retrieve values from pageStorage', () => {
    store.page('key', 'value');
    const result = store.page('key');
    expect(result).toBe('value');
  });

  it('should handle JSON values correctly in pageStorage', () => {
    const value = { foo: 'bar' };
    store.page('obj', value);
    const result = store.page('obj');
    expect(result).toEqual(value);
  });

  it('should remove items correctly from pageStorage', () => {
    store.page('key', 'value');
    store.page.remove('key');
    const result = store.page('key');
    expect(result).toBeNull();
  });

  it('should clear all items from pageStorage', () => {
    store.page('key1', 'value1');
    store.page('key2', 'value2');
    store.page.clear();
    expect(store.page('key1')).toBeNull();
    expect(store.page('key2')).toBeNull();
  });
});
