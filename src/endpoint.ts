import ky, { KyInstance, Options } from 'ky';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
};

let kyInstance = new Proxy<KyInstance>(ky, {
  get: () => {
    return () => {
      console.error('@sibiaoke/utils [endpoint]: Please call init() first.');
      throw new Error('@sibiaoke/utils [endpoint]: Please call init() first.');
    }
  }
})

interface Opt extends Options {
  getRequestHeader?: () => Record<string, string>
  toastFunction?: (message: string) => void
}

export const init = (opt: Opt) => {
  const { getRequestHeader, toastFunction = console.error } = opt;
  kyInstance = ky.create({
    prefixUrl: opt.prefixUrl || '/api',
    timeout: opt.timeout || 10 * 60 * 1000,
    hooks: {
      beforeRequest: [
        (request) => {
          // Customize request headers here
          if (getRequestHeader) {
            const otherHeaders = getRequestHeader();
            Object.entries(otherHeaders).forEach(([key, value]) => {
              request.headers.set(key, value);
            });
          }
        },
        ...(opt?.hooks?.beforeRequest || [])
      ],
      afterResponse: [
        async (request, options, response) => {
          if (!response.ok) {
            const error = await response.json();
            const errorMessage = error.message || codeMessage[response.status] || '发生未知错误';
            toastFunction(errorMessage);
            const err = new Error(errorMessage);
            (err as any).status = response.status;
            (err as any).response = response;
            throw err;
          }
          return response;
        },
        ...(opt?.hooks?.afterResponse || [])
      ]
    }
  });
};

const getFileNameFromHeader = (response: Response): string | null => {
  const contentDisposition = response.headers.get('content-disposition');
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/);
    if (match) {
      return match[1];
    }
  }
  return null;
};

const downloadFile = async (response: Response, defaultFileName: string) => {
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  const fileName = getFileNameFromHeader(response) || defaultFileName;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

const endpoint = {
  get: async (url: string, params = {}, options?: Options) => await kyInstance.get(url, { searchParams: params, ...options }).json(),
  post: async (url: string, data = {}, options?: Options) => await kyInstance.post(url, { json: data, ...options }).json(),
  put: async (url: string, data = {}, options?: Options) => await kyInstance.put(url, { json: data, ...options }).json(),
  delete: async (url: string, options?: Options) => await kyInstance.delete(url, options).json(),
  upload: async (url: string, data: FormData, options?: Options) => await kyInstance.post(url, { body: data, headers: { 'Content-Type': 'multipart/form-data' }, ...options }).json(),
  download: async (url: string, options: { method?: 'get' | 'post', params?: any, data?: any, defaultFileName: string }) => {
    const { method = 'get', params, data, defaultFileName } = options;
    let response: Response;
    if (method === 'get') {
      response = await kyInstance.get(url, { searchParams: params });
    } else {
      response = await kyInstance.post(url, { json: data });
    }
    await downloadFile(response, defaultFileName);
  },
  getInstance: () => kyInstance
};

export default endpoint;
