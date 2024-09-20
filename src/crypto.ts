/**
 * 生成 SHA-256 哈希
 * @param data - 输入的字符串
 * @returns {Promise<string>} - SHA-256 哈希后的结果
 */
export async function sha256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  return bufferToHex(hashBuffer);
}

/**
 * 将 ArrayBuffer 转换为 16 进制字符串
 * @param buffer - ArrayBuffer
 * @returns {string} - 16 进制字符串
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * BASE64 编码
 * @param data - 输入的字符串
 * @returns {string} - BASE64 编码后的结果
 */
export function base64Encode(data: string): string {
  return btoa(data);
}

/**
 * BASE64 解码
 * @param data - BASE64 编码的字符串
 * @returns {string} - 解码后的字符串
 */
export function base64Decode(data: string): string {
  return atob(data);
}

/**
 * 生成 RSA 密钥对
 * @returns {Promise<{ publicKey: CryptoKey, privateKey: CryptoKey }>} - RSA 公钥和私钥
 */
export async function generateRSAKeys(): Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }> {
  return crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: "SHA-256" }
    },
    true,
    ["encrypt", "decrypt"]
  );
}

/**
 * 使用 RSA 公钥加密
 * @param publicKey - RSA 公钥
 * @param data - 需要加密的数据
 * @returns {Promise<ArrayBuffer>} - 加密后的 ArrayBuffer
 */
export async function rsaEncrypt(publicKey: CryptoKey, data: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  return crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    publicKey,
    encodedData
  );
}

/**
 * 使用 RSA 私钥解密
 * @param privateKey - RSA 私钥
 * @param encryptedData - 加密后的数据 ArrayBuffer
 * @returns {Promise<string>} - 解密后的字符串
 */
export async function rsaDecrypt(privateKey: CryptoKey, encryptedData: ArrayBuffer): Promise<string> {
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    privateKey,
    encryptedData
  );
  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}
