import { describe, it, expect } from 'vitest';
import {
  getDeviceInfo,
  isMobile,
  isTablet,
  isDesktop,
  isAndroid,
  isIOS,
  isWindows,
  isMacOS,
  isLinux,
  isWx
} from '../device';

describe('Device Utility Tests', () => {
  it('should detect device info', () => {
    const deviceInfo = getDeviceInfo();
    expect(deviceInfo).toHaveProperty('isMobile');
    expect(deviceInfo).toHaveProperty('isTablet');
    expect(deviceInfo).toHaveProperty('isDesktop');
    expect(deviceInfo).toHaveProperty('isAndroid');
    expect(deviceInfo).toHaveProperty('isIOS');
    expect(deviceInfo).toHaveProperty('isWindows');
    expect(deviceInfo).toHaveProperty('isMacOS');
    expect(deviceInfo).toHaveProperty('isLinux');
    expect(deviceInfo).toHaveProperty('isWx');
    expect(deviceInfo).toHaveProperty('userAgent');
  });

  it('should detect if device is mobile', () => {
    expect(typeof isMobile()).toBe('boolean');
  });

  it('should detect if device is tablet', () => {
    expect(typeof isTablet()).toBe('boolean');
  });

  it('should detect if device is desktop', () => {
    expect(typeof isDesktop()).toBe('boolean');
  });

  it('should detect if device is Android', () => {
    expect(typeof isAndroid()).toBe('boolean');
  });

  it('should detect if device is iOS', () => {
    expect(typeof isIOS()).toBe('boolean');
  });

  it('should detect if OS is Windows', () => {
    expect(typeof isWindows()).toBe('boolean');
  });

  it('should detect if OS is MacOS', () => {
    expect(typeof isMacOS()).toBe('boolean');
  });

  it('should detect if OS is Linux', () => {
    expect(typeof isLinux()).toBe('boolean');
  });

  it('should detect if browser is WeChat', () => {
    expect(typeof isWx()).toBe('boolean');
  });
});
