import { describe, it, expect } from 'vitest';
import {
  bd09ToGcj02,
  gcj02ToBd09,
  wgs84ToGcj02,
  gcj02ToWgs84,
  bd09ToWgs84,
  wgs84ToBd09,
  outOfChina
} from '../coord';

describe('Coordinate Transformation Tests', () => {
  it('BD-09 to GCJ-02', () => {
    const { lat, lon } = bd09ToGcj02(39.913818, 116.363625);
    expect(lat).toBeCloseTo(39.9080384, 5);
    expect(lon).toBeCloseTo(116.357057, 5);
  });

  it('GCJ-02 to BD-09', () => {
    const { lat, lon } = gcj02ToBd09(39.907324, 116.357755);
    expect(lat).toBeCloseTo(39.913112, 5);
    expect(lon).toBeCloseTo(116.364319, 5);
  });

  it('WGS-84 to GCJ-02', () => {
    const { lat, lon } = wgs84ToGcj02(39.913818, 116.363625);
    expect(lat).toBeCloseTo(39.915192, 5);
    expect(lon).toBeCloseTo(116.369834, 5);
  });

  it('GCJ-02 to WGS-84', () => {
    const { lat, lon } = gcj02ToWgs84(39.915378, 116.367847);
    expect(lat).toBeCloseTo(39.913997, 5);
    expect(lon).toBeCloseTo(116.361630, 5);
  });

  it('BD-09 to WGS-84', () => {
    const { lat, lon } = bd09ToWgs84(39.913818, 116.363625);
    expect(lat).toBeCloseTo(39.906674, 5);
    expect(lon).toBeCloseTo(116.350860, 5);
  });

  it('WGS-84 to BD-09', () => {
    const { lat, lon } = wgs84ToBd09(39.913818, 116.363625);
    expect(lat).toBeCloseTo(39.921184, 5);
    expect(lon).toBeCloseTo(116.376322, 5);
  });

  it('Out of China', () => {
    expect(outOfChina(0, 0)).toBe(true);
    expect(outOfChina(40, 115)).toBe(false);
  });
});
