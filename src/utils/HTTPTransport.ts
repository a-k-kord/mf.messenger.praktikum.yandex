import { PlainObject, queryString } from './utils';
import { handleApiResponse } from './api';

export enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

export type HttpOptions = {
    headers?: Record<string, string>,
    method?: keyof typeof METHODS,
    data?: PlainObject,
    timeout?: number,
    withCredentials?: boolean,
    tries?: number
}

export class HTTPTransport {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }

    get = (urlPath: string, options?: HttpOptions) => {
        let { data } = options;
        urlPath += queryString(data) || '';

        return this.request(urlPath, {
            ...options,
            method: METHODS.GET
        });
    };

    put = (urlPath: string, options?: HttpOptions) => {
        return this.request(urlPath, {
            ...options,
            method: METHODS.PUT
        });
    };

    post = (urlPath: string, options?: HttpOptions) => {
        return this.request(urlPath, {
            ...options,
            method: METHODS.POST
        });
    };

    delete = (urlPath: string, options?: HttpOptions) => {
        return this.request(urlPath, {
            ...options,
            method: METHODS.DELETE
        });
    };

    request = (urlPath: string, options?: HttpOptions): Promise<PlainObject> => {
        const {
            timeout = 5000,
            withCredentials = false,
            method = METHODS.GET,
            headers,
            data
        } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            xhr.withCredentials = withCredentials;
            xhr.open(method, `${this.baseUrl}${urlPath}`);

            xhr.onload = function () {
                resolve(handleApiResponse(xhr));
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (data) {
                if (typeof data === 'string') {
                    xhr.setRequestHeader('Content-type', 'text/html')
                } else if(!(data instanceof FormData)) {
                    xhr.setRequestHeader('Content-type', 'application/json')
                }
            }
            xhr.setRequestHeader('accept', 'application/json')

            if (typeof headers === "object") {
                for (let headerName in headers) {
                    xhr.setRequestHeader(headerName, headers[headerName]);
                }
            }

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                if(data instanceof FormData) {
                    xhr.send(data);
                } else {
                    xhr.send(JSON.stringify(data));
                }
            }
        });
    };
}

export function fetchWithRetry(baseUrl: string, urlPath: string, options?: HttpOptions) {
    const {
        tries = 2
    } = options;

    function onError(err: Error) {
        const triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }

        return fetchWithRetry(baseUrl, urlPath, {
            ...options,
            tries: triesLeft
        });
    }

    return (new HTTPTransport(baseUrl).get(urlPath, options)).catch(onError); // fetch
}

