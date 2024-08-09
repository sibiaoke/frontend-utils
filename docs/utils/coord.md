
# 坐标转换工具函数

此文档介绍了一组用于在不同坐标系之间进行转换的工具函数。支持的坐标系包括 BD-09（百度坐标系）、GCJ-02（中国国测局坐标系）和 WGS-84（全球GPS坐标系）。

## 使用方法

在你的项目中导入这些函数并使用：

```typescript
import { coord } from '@sibiaoke/utils';

const {
  bd09ToGcj02,
  gcj02ToBd09,
  wgs84ToGcj02,
  gcj02ToWgs84,
  bd09ToWgs84,
  wgs84ToBd09
} = coord;

```

## 函数列表

| 函数名             | 描述                                                                                  | 参数                              | 返回值               |
| ------------------ | ------------------------------------------------------------------------------------- | --------------------------------- | ------------------ |
| `bd09ToGcj02`      | 将 BD-09 坐标系转换为 GCJ-02 坐标系                                                   | `lat: number`, `lon: number`     | `{ lat: number, lon: number }` |
| `gcj02ToBd09`      | 将 GCJ-02 坐标系转换为 BD-09 坐标系                                                   | `lat: number`, `lon: number`     | `{ lat: number, lon: number }` |
| `wgs84ToGcj02`     | 将 WGS-84 坐标系转换为 GCJ-02 坐标系                                                  | `lat: number`, `lon: number`     | `{ lat: number, lon: number }` |
| `gcj02ToWgs84`     | 将 GCJ-02 坐标系转换为 WGS-84 坐标系                                                  | `lat: number`, `lon: number`     | `{ lat: number, lon: number }` |
| `bd09ToWgs84`      | 将 BD-09 坐标系转换为 WGS-84 坐标系                                                   | `lat: number`, `lon: number`     | `{ lat: number, lon: number }` |
| `wgs84ToBd09`      | 将 WGS-84 坐标系转换为 BD-09 坐标系                                                   | `lat: number`, `lon: number`     | `{ lat: number, lon: number }` |
| `outOfChina`       | 判断坐标是否位于中国境内                                                              | `lat: number`, `lon: number`     | `boolean`            |

## 函数详细说明

### `bd09ToGcj02`

```typescript
export function bd09ToGcj02(lat: number, lon: number): Coordinates;
```

将 BD-09 坐标转换为 GCJ-02 坐标。

- **参数**
  - `lat`：纬度
  - `lon`：经度
- **返回值**
  - 返回转换后的 GCJ-02 坐标。

### `gcj02ToBd09`

```typescript
export function gcj02ToBd09(lat: number, lon: number): Coordinates;
```

将 GCJ-02 坐标转换为 BD-09 坐标。

- **参数**
  - `lat`：纬度
  - `lon`：经度
- **返回值**
  - 返回转换后的 BD-09 坐标。

### `wgs84ToGcj02`

```typescript
export function wgs84ToGcj02(lat: number, lon: number): Coordinates;
```

将 WGS-84 坐标转换为 GCJ-02 坐标。

- **参数**
  - `lat`：纬度
  - `lon`：经度
- **返回值**
  - 返回转换后的 GCJ-02 坐标。

### `gcj02ToWgs84`

```typescript
export function gcj02ToWgs84(lat: number, lon: number): Coordinates;
```

将 GCJ-02 坐标转换为 WGS-84 坐标。

- **参数**
  - `lat`：纬度
  - `lon`：经度
- **返回值**
  - 返回转换后的 WGS-84 坐标。

### `bd09ToWgs84`

```typescript
export function bd09ToWgs84(lat: number, lon: number): Coordinates;
```

将 BD-09 坐标转换为 WGS-84 坐标。

- **参数**
  - `lat`：纬度
  - `lon`：经度
- **返回值**
  - 返回转换后的 WGS-84 坐标。

### `wgs84ToBd09`

```typescript
export function wgs84ToBd09(lat: number, lon: number): Coordinates;
```

将 WGS-84 坐标转换为 BD-09 坐标。

- **参数**
  - `lat`：纬度
  - `lon`：经度
- **返回值**
  - 返回转换后的 BD-09 坐标。

### `outOfChina`

```typescript
export function outOfChina(lat: number, lon: number): boolean;
```

判断坐标是否位于中国境内。

- **参数**
  - `lat`：纬度
  - `lon`：经度
- **返回值**
  - 返回一个布尔值，表示该坐标是否位于中国境内。
