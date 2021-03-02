import { PlainObject } from "./utils.js";
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
    get: (url: string, options?: HttpOptions) => Promise<PlainObject<unknown>>;
    put: (url: string, options?: HttpOptions) => Promise<PlainObject<unknown>>;
    post: (url: string, options?: HttpOptions) => Promise<PlainObject<unknown>>;
    delete: (url: string, options?: HttpOptions) => Promise<PlainObject<unknown>>;
    request: (url: string, options?: HttpOptions) => Promise<PlainObject>;
}
export declare function fetchWithRetry(url: string, options?: HttpOptions): any;
