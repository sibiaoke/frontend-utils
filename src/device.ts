interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isWindows: boolean;
  isMacOS: boolean;
  isLinux: boolean;
  isWx: boolean;
  userAgent: string;
}

/**
 * 获取设备信息
 * @returns {DeviceInfo} 设备信息
 */
export function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  const isWindows = /windows/i.test(userAgent);
  const isMacOS = /macintosh|mac os x/i.test(userAgent);
  const isLinux = /linux/i.test(userAgent);
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
  const isWx = /MicroMessenger/i.test(userAgent);

  const isMobile = /android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android|PlayBook|Silk/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isAndroid,
    isIOS,
    isWindows,
    isMacOS,
    isLinux,
    isWx,
    userAgent
  };
}

/**
 * 判断是否是移动设备
 * @returns {boolean} 是否是移动设备
 */
export function isMobile(): boolean {
  return getDeviceInfo().isMobile;
}

/**
 * 判断是否是平板设备
 * @returns {boolean} 是否是平板设备
 */
export function isTablet(): boolean {
  return getDeviceInfo().isTablet;
}

/**
 * 判断是否是桌面设备
 * @returns {boolean} 是否是桌面设备
 */
export function isDesktop(): boolean {
  return getDeviceInfo().isDesktop;
}

/**
 * 判断是否是安卓设备
 * @returns {boolean} 是否是安卓设备
 */
export function isAndroid(): boolean {
  return getDeviceInfo().isAndroid;
}

/**
 * 判断是否是 iOS 设备
 * @returns {boolean} 是否是 iOS 设备
 */
export function isIOS(): boolean {
  return getDeviceInfo().isIOS;
}

/**
 * 判断是否是 Windows 操作系统
 * @returns {boolean} 是否是 Windows 操作系统
 */
export function isWindows(): boolean {
  return getDeviceInfo().isWindows;
}

/**
 * 判断是否是 MacOS 操作系统
 * @returns {boolean} 是否是 MacOS 操作系统
 */
export function isMacOS(): boolean {
  return getDeviceInfo().isMacOS;
}

/**
 * 判断是否是 Linux 操作系统
 * @returns {boolean} 是否是 Linux 操作系统
 */
export function isLinux(): boolean {
  return getDeviceInfo().isLinux;
}

/**
 * 判断是否是微信浏览器
 * @returns {boolean} 是否是微信浏览器
 */
export function isWx(): boolean {
  return getDeviceInfo().isWx;
}
