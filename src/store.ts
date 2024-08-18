interface StorageApi extends Storage {
  setItem<T = any>(key: string, value: T): void;
  getItem(key: string): any;
}

interface StoreInstance extends Store {
  namespace(namespace: string): StoreInstance;
  <T>(key: string): T;
  <T>(key: string, value: T): void;
  local: StoreInstance;
  session: StoreInstance;
  page: StoreInstance;
}

const createStorageProxy = (storage: Storage, namespace?: string): StorageApi => {
  return new Proxy(storage, {
    get: (target, key) => {
      const getKey = (key: string) => {
        return `${namespace ? namespace + '.' : ''}${key}`;
      };
      switch (key) {
        case 'getItem':
          return (key: string) => {
            return JSON.parse(target.getItem(getKey(key)) || 'null');
          };
        case 'setItem':
          return (key: string, value: string) => {
            target.setItem(getKey(key), JSON.stringify(value));
          };
        case 'removeItem':
          return (key: string) => {
            target.removeItem(getKey(key));
          };
      }
      let value = target[key as string];
      return typeof value === 'function' ? value.bind(target) : value;
    }
  }) as StorageApi;
};

class PageStorage implements Storage {
  private storage: Record<string, string> = {};
  constructor() {}

  public get length() {
    return Object.keys(this.storage).length;
  }

  public clear() {
    this.storage = {};
  }

  public getItem(key: string) {
    return this.storage[key];
  }

  public key(index: number) {
    return Object.keys(this.storage)[index];
  }

  public removeItem(key: string) {
    delete this.storage[key];
  }

  public setItem(key: string, value: string) {
    this.storage[key] = value;
  }
}

function create(namespace?: string): StoreInstance {
  const local = new Store(localStorage, namespace);
  const session = new Store(sessionStorage, namespace);
  const pageStorage = new PageStorage();
  const page = new Store(pageStorage, namespace);

  const _func = ((key: string, value?: any) => {
    if (value === undefined) {
      return local.get(key);
    } else {
      local.set(key, value);
    }
  }) as StoreInstance;

  Object.setPrototypeOf(_func, local);

  const _func_session = ((key: string, value?: any) => {
    if (value === undefined) {
      return session.get(key);
    } else {
      session.set(key, value);
    }
  }) as StoreInstance;

  Object.setPrototypeOf(_func_session, session);

  const _func_page = ((key: string, value?: any) => {
    if (value === undefined) {
      return page.get(key);
    } else {
      page.set(key, value);
    }
  }) as StoreInstance;

  Object.setPrototypeOf(_func_page, page);

  _func.local = _func;
  _func.session = _func_session;
  _func.page = _func_page;
  _func.namespace = (namespace: string) => create(namespace);
  return _func;
}

class Store {
  protected storage: StorageApi;

  constructor(s: Storage, namespace?: string) {
    this.storage = createStorageProxy(s, namespace);
  }

  public get<T>(key: string): T {
    return this.storage.getItem(key);
  }

  public set<T>(key: string, value: T): void {
    this.storage.setItem(key, value);
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

const store = create();

export default store;
