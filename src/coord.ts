const xPi = (Math.PI * 3000.0) / 180.0;
const pi = Math.PI;
const a = 6378245.0;
const ee = 0.00669342162296594323;

interface Coordinates {
  lat: number;
  lon: number;
}

/**
 * BD-09 to GCJ-02
 * @param lat Latitude
 * @param lon Longitude
 * @returns {Coordinates} GCJ-02 coordinates
 */
export function bd09ToGcj02(lat: number, lon: number): Coordinates {
  const x = lon - 0.0065;
  const y = lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPi);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPi);
  const gcjLat = z * Math.sin(theta);
  const gcjLon = z * Math.cos(theta);
  return { lat: gcjLat, lon: gcjLon };
}

/**
 * GCJ-02 to BD-09
 * @param lat Latitude
 * @param lon Longitude
 * @returns {Coordinates} BD-09 coordinates
 */
export function gcj02ToBd09(lat: number, lon: number): Coordinates {
  const z = Math.sqrt(lon * lon + lat * lat) + 0.00002 * Math.sin(lat * xPi);
  const theta = Math.atan2(lat, lon) + 0.000003 * Math.cos(lon * xPi);
  const bdLat = z * Math.sin(theta) + 0.006;
  const bdLon = z * Math.cos(theta) + 0.0065;
  return { lat: bdLat, lon: bdLon };
}

/**
 * WGS-84 to GCJ-02
 * @param lat Latitude
 * @param lon Longitude
 * @returns {Coordinates} GCJ-02 coordinates
 */
export function wgs84ToGcj02(lat: number, lon: number): Coordinates {
  if (outOfChina(lat, lon)) {
    return { lat, lon };
  }
  let dLat = transformLat(lon - 105.0, lat - 35.0);
  let dLon = transformLon(lon - 105.0, lat - 35.0);
  const radLat = (lat / 180.0) * pi;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
  dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
  const mgLat = lat + dLat;
  const mgLon = lon + dLon;
  return { lat: mgLat, lon: mgLon };
}

/**
 * GCJ-02 to WGS-84
 * @param lat Latitude
 * @param lon Longitude
 * @returns {Coordinates} WGS-84 coordinates
 */
export function gcj02ToWgs84(lat: number, lon: number): Coordinates {
  if (outOfChina(lat, lon)) {
    return { lat, lon };
  }
  let dLat = transformLat(lon - 105.0, lat - 35.0);
  let dLon = transformLon(lon - 105.0, lat - 35.0);
  const radLat = (lat / 180.0) * pi;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
  dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
  const mgLat = lat + dLat;
  const mgLon = lon + dLon;
  return { lat: lat * 2 - mgLat, lon: lon * 2 - mgLon };
}

/**
 * BD-09 to WGS-84
 * @param lat Latitude
 * @param lon Longitude
 * @returns {Coordinates} WGS-84 coordinates
 */
export function bd09ToWgs84(lat: number, lon: number): Coordinates {
  const gcj = bd09ToGcj02(lat, lon);
  return gcj02ToWgs84(gcj.lat, gcj.lon);
}

/**
 * WGS-84 to BD-09
 * @param lat Latitude
 * @param lon Longitude
 * @returns {Coordinates} BD-09 coordinates
 */
export function wgs84ToBd09(lat: number, lon: number): Coordinates {
  const gcj = wgs84ToGcj02(lat, lon);
  return gcj02ToBd09(gcj.lat, gcj.lon);
}

function transformLat(x: number, y: number): number {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0;
  ret += ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) * 2.0) / 3.0;
  return ret;
}

function transformLon(x: number, y: number): number {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0;
  ret += ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) * 2.0) / 3.0;
  return ret;
}

export function outOfChina(lat: number, lon: number): boolean {
  return lon < 72.004 || lon > 137.8347 || lat < 0.8293 || lat > 55.8271;
}
