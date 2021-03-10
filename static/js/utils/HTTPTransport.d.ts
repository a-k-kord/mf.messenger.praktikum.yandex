import { PlainObject } from './utils';
export declare enum METHODS {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
}
export declare type HttpOptions = {
    headers?: Record<string, string>;
    method?: keyof typeof METHODS;
    data?: PlainObject;
    timeout?: number;
    withCredentials?: boolean;
    tries?: number;
};
export declare class HTTPTransport {
    private baseUrl;
    constructor(baseUrl?: string);
    get: (urlPath: string, options?: HttpOptions) => Promise<PlainObject<unknown>>;
    put: (urlPath: string, options?: HttpOptions) => Promise<PlainObject<unknown>>;
    post: (urlPath: string, options?: HttpOptions) => Promise<PlainObject<unknown>>;
    delete: (urlPath: string, options?: HttpOptions) => Promise<PlainObject<unknown>>;
    request: (urlPath: string, options?: HttpOptions) => Promise<PlainObject>;
}
export declare function fetchWithRetry(baseUrl: string, urlPath: string, options?: HttpOptions): any;
