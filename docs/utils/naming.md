# 命名转换工具

`naming.ts` 提供了用于在不同命名法之间转换的实用工具函数。当前包含以下两个函数：

1. **camelToKebab**: 将驼峰命名法转换为横线命名法。
2. **kebabToCamel**: 将横线命名法转换为驼峰命名法。

## 函数详解

### 1. `camelToKebab`

将驼峰命名法（camelCase）字符串转换为横线命名法（kebab-case）。

#### 用法

```typescript
camelToKebab(str: string): string
```

#### 参数

| 参数 | 类型   | 描述                       |
| ---- | ------ | -------------------------- |
| str  | string | 需要转换的驼峰命名字符串。 |

#### 返回值

返回一个字符串，表示转换后的横线命名法。

#### 示例

```typescript
import { naming } from '@sibiaoke/utils';

const { camelToKebab } = naming;

console.log(camelToKebab('camelCaseString')); // 输出: 'camel-case-string'
console.log(camelToKebab('thisIsATest'));     // 输出: 'this-is-a-test'
```

### 2. `kebabToCamel`

将横线命名法（kebab-case）字符串转换为驼峰命名法（camelCase）。

#### 用法

```typescript
kebabToCamel(str: string): string
```

#### 参数

| 参数 | 类型   | 描述                       |
| ---- | ------ | -------------------------- |
| str  | string | 需要转换的横线命名字符串。 |

#### 返回值

返回一个字符串，表示转换后的驼峰命名法。

#### 示例

```typescript
import { naming } from '@sibiaoke/utils';

const { kebabToCamel } = naming;

console.log(kebabToCamel('kebab-case-string')); // 输出: 'kebabCaseString'
console.log(kebabToCamel('this-is-a-test'));    // 输出: 'thisIsATest'
```

## 使用场景

- **转换变量命名**：在开发过程中，有时需要在不同的命名法之间进行转换，例如将 API 返回的数据字段名称从下划线命名法（snake_case）转换为驼峰命名法（camelCase）。
- **格式化样式类名**：在前端开发中，经常需要根据组件名自动生成样式类名，`camelToKebab` 可以帮助将组件名（通常是驼峰命名法）转换为样式类名（通常是横线命名法）。

