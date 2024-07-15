import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import ky from 'ky';
import { server } from '../mocks/server';
import endpoint, { init } from '../endpoint';

beforeAll(() => {
  // 启动 msw 服务器
  server.listen();
});

afterAll(() => {
  // 关闭 msw 服务器
  server.close();
});

beforeEach(() => {
  // 重置所有请求处理程序
  server.resetHandlers();
});

afterEach(() => {
  // 清理所有模拟
  vi.clearAllMocks();
  // 清理所有 <a> 元素
  const links = document.querySelectorAll('a');
  links.forEach(link => link.remove());
});

describe('endpoint', () => {
  it('should handle initialization with missing options', async () => {
    let error: any;
    try {
      await endpoint.get('user');
    } catch (err) {
      error = err;
    }
    expect(error).toBeTruthy();
    expect(error.message).toBe('@sibiaoke/utils [endpoint]: Please call init() first.');
  });

  it('should initialize with correct options', () => {
    init({ prefixUrl: 'https://example.com', getRequestHeader: () => ({ 'X-Test-Header': 'test' }) });
    const instance = endpoint.getInstance();
    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(ky.constructor);
  });

  it('should get data', async () => {
    const data = await endpoint.get('test');
    expect(data).toEqual({ data: 'test' });
  });

  it('should post data', async () => {
    const data = await endpoint.post('test', { foo: 'bar' });
    expect(data).toEqual({ data: 'test' });
  });

  it('should put data', async () => {
    const data = await endpoint.put('test', { foo: 'bar' });
    expect(data).toEqual({ data: 'test' });
  });

  it('should delete data', async () => {
    const data = await endpoint.delete('test');
    expect(data).toEqual({ data: 'test' });
  });

  it('should upload data', async () => {
    const formData = new FormData();
    formData.append('file', new Blob(), 'test.txt');
    const data = await endpoint.upload('test', formData);
    expect(data).toEqual({ data: 'test' });
  });

  it('should download data with GET method', async () => {
    const defaultFileName = 'default.txt';

    // Spy on createObjectURL to capture the blob URL
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');

    await endpoint.download('test/download', { method: 'get', defaultFileName });

    // Verify the URL.createObjectURL was called
    expect(createObjectURLSpy).toHaveBeenCalled();

    // Verify the anchor element creation and click
    const anchorElement = document.querySelector('a');
    expect(anchorElement).toBeTruthy();
    if (anchorElement) {
      expect(anchorElement.getAttribute('download')).toBe('test.txt');
      expect(anchorElement.href).toBe(createObjectURLSpy.mock.results[0].value);
    }

    createObjectURLSpy.mockRestore();
  });

  it('should download data with POST method', async () => {
    const defaultFileName = 'default.txt';

    // Spy on createObjectURL to capture the blob URL
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');

    await endpoint.download('test/download', { method: 'post', data: {}, defaultFileName });

    // Verify the URL.createObjectURL was called
    expect(createObjectURLSpy).toHaveBeenCalled();

    // Verify the anchor element creation and click
    const anchorElement = document.querySelector('a');
    expect(anchorElement).toBeTruthy();
    if (anchorElement) {
      expect(anchorElement.getAttribute('download')).toBe('test.txt');
      expect(anchorElement.href).toBe(createObjectURLSpy.mock.results[0].value);
    }

    createObjectURLSpy.mockRestore();
  });

  it('should use default file name if no content-disposition header', async () => {
    const defaultFileName = 'default.txt';

    // Spy on createObjectURL to capture the blob URL
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');

    await endpoint.download('test/download-no-filename', { method: 'get', defaultFileName });

    // Verify the URL.createObjectURL was called
    expect(createObjectURLSpy).toHaveBeenCalled();

    // Verify the anchor element creation and click
    const anchorElement = document.querySelector('a');
    expect(anchorElement).toBeTruthy();
    if (anchorElement) {
      expect(anchorElement.getAttribute('download')).toBe(defaultFileName);
      expect(anchorElement.href).toBe(createObjectURLSpy.mock.results[0].value);
    }

    createObjectURLSpy.mockRestore();
  });

  it('should handle errors in afterResponse hook', async () => {
    let error: any;
    try {
      await endpoint.get('error');
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
    expect(error.message).toBe('Internal Server Error');
    expect(error.status).toBe(500);
  });

});
