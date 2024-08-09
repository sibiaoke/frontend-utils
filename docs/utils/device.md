# 设备信息

该工具提供了一组函数，用于根据用户代理字符串检测当前设备和操作系统的信息。它可以详细判断用户是否在移动设备、平板电脑、桌面设备上，以及是否使用特定的操作系统（如 Android、iOS、Windows、macOS 和 Linux）。此外，还可以检测用户是否在使用微信浏览器。

## 接口：`DeviceInfo`

```typescript
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
```

## 函数：`getDeviceInfo`

```typescript
getDeviceInfo(): DeviceInfo
```

### 描述

返回一个包含当前设备和操作系统详细信息的对象。

### 返回值

- `DeviceInfo`：一个包含以下属性的对象：
  - `isMobile`：`boolean` - 指示设备是否为移动设备。
  - `isTablet`：`boolean` - 指示设备是否为平板设备。
  - `isDesktop`：`boolean` - 指示设备是否为桌面设备。
  - `isAndroid`：`boolean` - 指示操作系统是否为 Android。
  - `isIOS`：`boolean` - 指示操作系统是否为 iOS。
  - `isWindows`：`boolean` - 指示操作系统是否为 Windows。
  - `isMacOS`：`boolean` - 指示操作系统是否为 macOS。
  - `isLinux`：`boolean` - 指示操作系统是否为 Linux。
  - `isWx`：`boolean` - 指示是否为微信浏览器。
  - `userAgent`：`string` - 浏览器的用户代理字符串。

## 函数：`isMobile`

```typescript
isMobile(): boolean
```

### 描述

检查设备是否为移动设备。

### 返回值

- `boolean`：如果设备是移动设备，则返回 `true`，否则返回 `false`。

## 函数：`isTablet`

```typescript
isTablet(): boolean
```

### 描述

检查设备是否为平板设备。

### 返回值

- `boolean`：如果设备是平板设备，则返回 `true`，否则返回 `false`。

## 函数：`isDesktop`

```typescript
isDesktop(): boolean
```

### 描述

检查设备是否为桌面设备。

### 返回值

- `boolean`：如果设备是桌面设备，则返回 `true`，否则返回 `false`。

## 函数：`isAndroid`

```typescript
isAndroid(): boolean
```

### 描述

检查操作系统是否为 Android。

### 返回值

- `boolean`：如果操作系统是 Android，则返回 `true`，否则返回 `false`。

## 函数：`isIOS`

```typescript
isIOS(): boolean
```

### 描述

检查操作系统是否为 iOS。

### 返回值

- `boolean`：如果操作系统是 iOS，则返回 `true`，否则返回 `false`。

## 函数：`isWindows`

```typescript
isWindows(): boolean
```

### 描述

检查操作系统是否为 Windows。

### 返回值

- `boolean`：如果操作系统是 Windows，则返回 `true`，否则返回 `false`。

## 函数：`isMacOS`

```typescript
isMacOS(): boolean
```

### 描述

检查操作系统是否为 macOS。

### 返回值

- `boolean`：如果操作系统是 macOS，则返回 `true`，否则返回 `false`。

## 函数：`isLinux`

```typescript
isLinux(): boolean
```

### 描述

检查操作系统是否为 Linux。

### 返回值

- `boolean`：如果操作系统是 Linux，则返回 `true`，否则返回 `false`。

## 函数：`isWx`

```typescript
isWx(): boolean
```

### 描述

检查浏览器是否为微信浏览器。

### 返回值

- `boolean`：如果浏览器是微信浏览器，则返回 `true`，否则返回 `false`。

## 示例用法

### 检测当前设备信息

你可以使用 `getDeviceInfo` 函数获取当前设备的所有详细信息：

```typescript
import { device } from '@sibiaoke/utils';

const deviceInfo = device.getDeviceInfo();
console.log(deviceInfo);
// 输出类似如下对象：
// {
//   isMobile: false,
//   isTablet: false,
//   isDesktop: true,
//   isAndroid: false,
//   isIOS: false,
//   isWindows: true,
//   isMacOS: false,
//   isLinux: false,
//   isWx: false,
//   userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
// }
```

### 检查设备类型

如果你只想检查设备是否为移动设备、平板电脑或桌面设备，你可以使用以下函数：

```typescript
import { device } from '@sibiaoke/utils';
const { isMobile, isTablet, isDesktop } = device;

if (isMobile()) {
  console.log('当前设备是移动设备');
} else if (isTablet()) {
  console.log('当前设备是平板设备');
} else if (isDesktop()) {
  console.log('当前设备是桌面设备');
}
```

### 检查操作系统类型

你也可以单独检查操作系统类型：

```typescript
import { device } from '@sibiaoke/utils';
const { isAndroid, isIOS, isWindows, isMacOS, isLinux } = device;

if (isAndroid()) {
  console.log('当前设备运行的是 Android');
} else if (isIOS()) {
  console.log('当前设备运行的是 iOS');
} else if (isWindows()) {
  console.log('当前设备运行的是 Windows');
} else if (isMacOS()) {
  console.log('当前设备运行的是 macOS');
} else if (isLinux()) {
  console.log('当前设备运行的是 Linux');
}
```

### 检查是否为微信浏览器

有时候你需要知道用户是否通过微信浏览器访问：

```typescript
import { device } from '@sibiaoke/utils';
const { isWx } = device;

if (isWx()) {
  console.log('当前是在微信浏览器中');
}
```
