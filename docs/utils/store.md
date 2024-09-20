# Store 工具库

`Store` 是一个轻量级的工具库，用于管理浏览器的 `localStorage`、`sessionStorage` 和页面级存储 (`PageStorage`)。通过它可以轻松地在不同的存储区域之间切换，并且支持命名空间，防止存储键名冲突。

## 快速开始

首先，你可以通过 `create` 函数来创建一个 `StoreInstance` 实例：

```typescript
import { store } from '@sibiaoke/utils';

// 存储一个值
store.set('key', 'value');

// 获取一个值
const value = store('key');
console.log(value); // 输出 'value'

// 从 sessionStorage 中获取值
const sessionValue = store.session('key');

// 从 pageStorage 中获取值
const pageValue = store.page('key');
```

## 命名空间

如果你需要使用命名空间来隔离不同模块或功能的存储数据，可以通过 `namespace` 方法创建一个具有指定命名空间的 `StoreInstance`：

```typescript
const nsStore = store.namespace('myNamespace');

nsStore('key', 'value');

// 实际存储的键名为 'myNamespace.key'
const value = nsStore('key');
console.log(value); // 输出 'value'
```

## API 文档

### create(namespace?: string): StoreInstance

创建一个 `StoreInstance` 实例。

- **参数**
  - `namespace` (可选): 用于存储键名的命名空间。

- **返回值**
  - `StoreInstance`: 包含多个存储区域的实例对象。

### StoreInstance.get`<T>`(key: string): T

从存储中获取一个值。

- **参数**
  - `key`: 键名。

- **返回值**
  - 存储的值，类型为 `T`。

### StoreInstance.set`<T>`(key: string, value: T): void

向存储中设置一个值。

- **参数**
  - `key`: 键名。
  - `value`: 要存储的值。

### StoreInstance.remove(key: string): void

从存储中删除一个键值对。

- **参数**
  - `key`: 键名。

### StoreInstance.clear(): void

清空当前存储区域中的所有数据。

### StoreInstance.local: Store

访问 `localStorage` 的存储实例。

### StoreInstance.session: Store

访问 `sessionStorage` 的存储实例。

### StoreInstance.page: Store

访问 `PageStorage` 的存储实例。`PageStorage` 是一个仅在当前页面生命周期内有效的存储。

### StoreInstance.namespace(namespace: string): StoreInstance

创建一个具有指定命名空间的 `StoreInstance` 实例。

- **参数**
  - `namespace`: 命名空间名称。

- **返回值**
  - `StoreInstance`: 包含命名空间的存储实例对象。

## 示例用法

```typescript
import { store } from '@sibiaoke/utils';

// 使用 localStorage
store.local('username', 'Alice');
console.log(store.local('username')); // 输出 'Alice'

// 使用 sessionStorage
store.session('sessionKey', 'sessionValue');
console.log(store.session('sessionKey')); // 输出 'sessionValue'

// 使用 pageStorage
store.page('pageKey', 'pageValue');
console.log(store.page('pageKey')); // 输出 'pageValue'

// 使用命名空间
const nsStore = store.namespace('app');
nsStore('config', { theme: 'dark' });
console.log(nsStore('config')); // 输出 { theme: 'dark' }
```

## PageStorage

`PageStorage` 是一个轻量级的页面级存储，它在页面关闭或刷新后数据会被清除，适用于临时数据的存储。
