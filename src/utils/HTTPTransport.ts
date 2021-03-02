import { PlainObject, queryString } from "./utils.js";
import { handleApiResponse } from "./api.js";

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
    get = (url: string, options?: HttpOptions) => {
        let { data } = options;
        url += queryString(data) || '';

        return this.request(url, {
            ...options,
            method: METHODS.GET
        });
    };

    put = (url: string, options?: HttpOptions) => {
        return this.request(url, {
            ...options,
            method: METHODS.PUT
        });
    };

    post = (url: string, options?: HttpOptions) => {
        return this.request(url, {
            ...options,
            method: METHODS.POST
        });
    };

    delete = (url: string, options?: HttpOptions) => {
        return this.request(url, {
            ...options,
            method: METHODS.DELETE
        });
    };

    request = (url: string, options?: HttpOptions): Promise<PlainObject> => {
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
            xhr.open(method, url);

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

export function fetchWithRetry(url: string, options?: HttpOptions) {
    const {
        tries = 2
    } = options;

    function onError(err: Error) {
        const triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }

        return fetchWithRetry(url, {
            ...options,
            tries: triesLeft
        });
    }

    return (new HTTPTransport().get(url, options)).catch(onError); // fetch
}

