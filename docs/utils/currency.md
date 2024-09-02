# `currency` 工具函数

`currency` 工具函数用于格式化数字为指定的货币格式，支持主流的货币类型。默认情况下，格式化为人民币 (CNY)。

## 函数定义

```typescript
function formatCurrency(amount: number, currency?: string): string;
```

## 参数说明

| 参数      | 类型     | 默认值 | 描述                                         |
| --------- | -------- | ------ | -------------------------------------------- |
| `amount`  | `number` | 必填   | 需要格式化的数字金额。                       |
| `currency`| `string` | `'CNY'`| 可选参数。指定需要格式化的货币类型（如`'USD'`, `'EUR'`, `'JPY'`等）。 |

## 支持的货币类型

- CNY (人民币)
- USD (美元)
- EUR (欧元)
- JPY (日元)
- GBP (英镑)
- 其他主流货币类型

## 返回值

`string` - 返回格式化后的货币字符串。

## 用法示例

```typescript
import { currency } from '@sibiaoke/utils';
const { format } = currency;

// 默认格式化为人民币
console.log(format(1234567.89)); // 输出: "¥1,234,567.89"

// 格式化为美元
console.log(format(1234567.89, 'USD')); // 输出: "$1,234,567.89"

// 格式化为欧元
console.log(format(1234567.89, 'EUR')); // 输出: "1.234.567,89 €"

// 格式化为日元
console.log(format(1234567.89, 'JPY')); // 输出: "¥1,234,568"

// 格式化为英镑
console.log(format(1234567.89, 'GBP')); // 输出: "£1,234,567.89"

// 处理负数
console.log(format(-1234567.89, 'USD')); // 输出: "-$1,234,567.89"

// 处理零
console.log(format(0, 'USD')); // 输出: "$0.00"
```

## 说明

1. **货币格式化**：函数使用 JavaScript 内置的 `Intl.NumberFormat` 对数字进行货币格式化。
2. **货币类型**：可以指定不同的货币类型，函数会自动根据货币符号进行格式化。
3. **国际化支持**：函数内部使用的 `Intl.NumberFormat` 会根据不同的货币和地区格式化数字。

## 注意事项

- 如果传入的货币类型不支持或未指定，函数将默认使用人民币 (CNY) 进行格式化。
- 对于某些货币（如日元 JPY），格式化时不显示小数部分。

## 依赖

- JavaScript 原生的 `Intl.NumberFormat` API。
