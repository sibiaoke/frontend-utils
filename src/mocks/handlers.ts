import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://example.com/test', () => {
    return HttpResponse.json({ data: 'test' });
  }),

  http.post('https://example.com/test', () => {
    return HttpResponse.json({ data: 'test' });
  }),

  http.put('https://example.com/test', () => {
    return HttpResponse.json({ data: 'test' });
  }),

  http.delete('https://example.com/test', () => {
    return HttpResponse.json({ data: 'test' });
  }),

  http.get('https://example.com/test/download', () => {
    return HttpResponse.json({ data: 'test' }, {
      headers: { 'Content-Disposition': 'attachment; filename="test.txt"' }
    });
  }),

  http.post('https://example.com/test/download', () => {
    return HttpResponse.json({ data: 'test' }, {
      headers: { 'Content-Disposition': 'attachment; filename="test.txt"' }
    });
  }),
  http.get('https://example.com/test/download-no-filename', () => {
    return HttpResponse.json({ data: 'test' });
  }),

  http.get('https://example.com/error', () => {
    return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }),
];
