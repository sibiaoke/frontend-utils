
# Endpoint 使用说明

## 初始化

首先需要初始化 Endpoint 实例，可以传入自定义的 headers 和 toast 函数。

```ts
import { init } from './endpoint';
// 错误提示方法，用 ant-design 举例
import { message } from 'antd';

init({
  prefixUrl: 'https://api.example.com',
  getRequestHeader: () => ({
    'X-Custom-Header': 'value'
  }),
  toastFunction: message.error
});
```

## 使用方法

### GET 请求

```ts
endpoint.get('api/v1/resource', { param1: 'value1' }).then(data => {
  console.log(data);
});
```

### POST 请求

```ts
endpoint.post('api/v1/resource', { key: 'value' }).then(data => {
  console.log(data);
});
```

### PUT 请求

```ts
endpoint.put('api/v1/resource', { key: 'value' }).then(data => {
  console.log(data);
});
```

### DELETE 请求

```ts
endpoint.delete('api/v1/resource').then(data => {
  console.log(data);
});
```

### 上传文件

```ts
const formData = new FormData();
formData.append('file', file);

endpoint.upload('api/v1/upload', formData).then(data => {
  console.log(data);
});
```

### 下载文件

下载文件时，会尝试从响应头中获取文件名，如果没有文件名则使用提供的默认文件名：

```ts
await endpoint.download('api/v1/download', {
  method: 'post', // or 'get'
  data: { key: 'value' }, // for post method
  defaultFileName: 'default.txt'
});
```

```ts
endpoint.download('api/v1/download', { method: 'get', defaultFileName: 'default.txt' }).then(() => {
  console.log('文件下载完成');
});
```
