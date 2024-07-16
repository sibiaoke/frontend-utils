### accurateNum 小数精度

#### 功能描述

`accurateNum` 函数用于解决 JavaScript 浮点数精度问题。该函数接收一个数字参数，并返回一个经过精度处理后的数字，避免浮点数运算中的精度丢失问题。

#### 参数说明

| 参数        | 类型    | 默认值 | 描述               |
| ----------- | ------- | ------ | ------------------ |
| `num`       | number  | 无     | 需要处理的数字     |
| `precision` | number  | 15     | 精度，默认为 15 位 |

#### 返回值

- 返回处理后的数字，类型为 `number`。

#### 使用示例

```ts
import { accurateNum } from './utils/accurateNum';

// 处理简单的浮点数
console.log(accurateNum(0.1)); // 输出: 0.1
console.log(accurateNum(0.2)); // 输出: 0.2
console.log(accurateNum(0.3)); // 输出: 0.3

// 处理浮点数运算
console.log(accurateNum(0.1 + 0.2)); // 输出: 0.3
console.log(accurateNum(0.1 * 3)); // 输出: 0.3
console.log(accurateNum(1.005)); // 输出: 1.005

// 处理大数字与小数字运算，导致精度丢失，推荐使用 bignumber.js 处理
console.log(accurateNum(0.1 * 3 * 1e18 + 1, 18)); // 输出: 300000000000000060

// 处理极小数字
console.log(accurateNum(1e-50, 50)); // 输出: 1e-50

// 处理 JavaScript 的最大安全整数
console.log(accurateNum(Number.MAX_SAFE_INTEGER, 16)); // 输出: 9007199254740991

// 处理 JavaScript 的最小安全整数
console.log(accurateNum(Number.MIN_SAFE_INTEGER, 16)); // 输出: -9007199254740991
```

#### 注意事项
- 该方法默认使用 15 位精度进行处理。如果需要处理更大或更小的数字，可以传入更高的精度。
- 该方法解决的是 JavaScript 浮点数运算中的常见精度丢失问题，但在极端情况下（如同时处理非常大的数字和非常小的数字）仍可能存在精度问题。对于这种情况，建议使用 `bignumber.js` 或 `decimal.js` 等库。
