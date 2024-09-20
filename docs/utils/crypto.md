# Crypto 工具库

该工具库提供了基于 Web Crypto API 的加密与解密功能，包括：

- **SHA-256** 哈希
- **BASE64** 编码/解码
- **RSA** 加密/解密

## 功能

### `sha256(data: string): Promise<string>`

生成输入字符串的 SHA-256 哈希。

- **参数**
  - `data` (string): 需要哈希的字符串。
- **返回**
  - `Promise<string>`: 哈希后的字符串，以 16 进制表示。

### `base64Encode(data: string): string`

将字符串进行 BASE64 编码。

- **参数**
  - `data` (string): 要编码的字符串。
- **返回**
  - `string`: 编码后的 BASE64 字符串。

### `base64Decode(data: string): string`

将 BASE64 编码的字符串解码。

- **参数**
  - `data` (string): BASE64 编码的字符串。
- **返回**
  - `string`: 解码后的原始字符串。

### `generateRSAKeys(): Promise<{ publicKey: CryptoKey, privateKey: CryptoKey }>`

生成 RSA 公钥与私钥。

- **返回**
  - `Promise<{ publicKey: CryptoKey, privateKey: CryptoKey }>`: 包含 RSA 公钥和私钥的对象。

### `rsaEncrypt(publicKey: CryptoKey, data: string): Promise<ArrayBuffer>`

使用 RSA 公钥加密字符串。

- **参数**
  - `publicKey` (CryptoKey): RSA 公钥。
  - `data` (string): 需要加密的字符串。
- **返回**
  - `Promise<ArrayBuffer>`: 加密后的数据。

### `rsaDecrypt(privateKey: CryptoKey, encryptedData: ArrayBuffer): Promise<string>`

使用 RSA 私钥解密数据。

- **参数**
  - `privateKey` (CryptoKey): RSA 私钥。
  - `encryptedData` (ArrayBuffer): 加密后的数据。
- **返回**
  - `Promise<string>`: 解密后的字符串。

### 使用示例
```typescript
import { crypto } from '@sibiaoke/utils';

const { sha256, base64Encode, base64Decode, generateRSAKeys, rsaEncrypt, rsaDecrypt } = crypto;

async function testCrypto() {
  const hash = await sha256('hello');
  console.log('SHA-256:', hash);

  const encoded = base64Encode('hello');
  console.log('BASE64 Encode:', encoded);

  const decoded = base64Decode(encoded);
  console.log('BASE64 Decode:', decoded);

  const { publicKey, privateKey } = await generateRSAKeys();
  const message = 'RSA Test';
  
  const encrypted = await rsaEncrypt(publicKey, message);
  const decrypted = await rsaDecrypt(privateKey, encrypted);

  console.log('Decrypted:', decrypted);
}

testCrypto();
```
