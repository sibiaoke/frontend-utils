import endpoint, { init } from './endpoint';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import ky from 'ky';

vi.mock('ky', () => {
  return {
    default: {
      get: vi.fn().mockResolvedValue({
        blob: vi.fn().mockResolvedValue(new Blob()),
        headers: new Headers({
          'content-disposition': 'attachment; filename="test.txt"'
        })
      }),
      post: vi.fn().mockResolvedValue({
        blob: vi.fn().mockResolvedValue(new Blob()),
        headers: new Headers({
          'content-disposition': 'attachment; filename="test.txt"'
        })
      }),
      create: vi.fn().mockReturnThis()
    }
  };
});

beforeAll(() => {
  init({ prefixUrl: 'https://api.example.com', getRequestHeader: () => ({ 'X-Test-Header': 'test' }) });
});

describe('endpoint', () => {
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
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation(() => {
      const a = document.createElement('a');
      a.click = vi.fn();
      return a;
    });
    await endpoint.download('test', { method: 'get', defaultFileName });
    const link = createElementSpy.mock.results[0].value as HTMLAnchorElement;
    expect(link.download).toBe('test.txt');
    expect(link.click).toHaveBeenCalled();
    createElementSpy.mockRestore();
  });

  it('should download data with POST method', async () => {
    const defaultFileName = 'default.txt';
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation(() => {
      const a = document.createElement('a');
      a.click = vi.fn();
      return a;
    });
    await endpoint.download('test', { method: 'post', data: {}, defaultFileName });
    const link = createElementSpy.mock.results[0].value as HTMLAnchorElement;
    expect(link.download).toBe('test.txt');
    expect(link.click).toHaveBeenCalled();
    createElementSpy.mockRestore();
  });

  it('should use default file name if no content-disposition header', async () => {
    (ky as any).get.mockResolvedValueOnce({
      blob: vi.fn().mockResolvedValue(new Blob()),
      headers: new Headers()
    });
    const defaultFileName = 'default.txt';
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation(() => {
      const a = document.createElement('a');
      a.click = vi.fn();
      return a;
    });
    await endpoint.download('test', { method: 'get', defaultFileName });
    const link = createElementSpy.mock.results[0].value as HTMLAnchorElement;
    expect(link.download).toBe(defaultFileName);
    expect(link.click).toHaveBeenCalled();
    createElementSpy.mockRestore();
  });
});
