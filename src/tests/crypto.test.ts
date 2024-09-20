import { sha256, base64Encode, base64Decode, generateRSAKeys, rsaEncrypt, rsaDecrypt } from '../crypto';
import { describe, it, expect } from 'vitest';

describe('Crypto Utilities', () => {
  it('should generate a SHA-256 hash', async () => {
    const hash = await sha256('hello');
    expect(hash).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  });

  it('should encode and decode base64 correctly', () => {
    const encoded = base64Encode('hello');
    expect(encoded).toBe('aGVsbG8=');

    const decoded = base64Decode(encoded);
    expect(decoded).toBe('hello');
  });

  it('should encrypt and decrypt using RSA', async () => {
    const { publicKey, privateKey } = await generateRSAKeys();
    const message = 'Secret message';

    const encryptedData = await rsaEncrypt(publicKey, message);
    const decryptedMessage = await rsaDecrypt(privateKey, encryptedData);

    expect(decryptedMessage).toBe(message);
  });
});
