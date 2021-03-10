var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { queryString } from './utils';
import { handleApiResponse } from './api';
export var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["PUT"] = "PUT";
    METHODS["POST"] = "POST";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
var HTTPTransport = (function () {
    function HTTPTransport(baseUrl) {
        var _this = this;
        if (baseUrl === void 0) { baseUrl = ''; }
        this.get = function (urlPath, options) {
            var data = options.data;
            urlPath += queryString(data) || '';
            return _this.request(urlPath, __assign(__assign({}, options), { method: METHODS.GET }));
        };
        this.put = function (urlPath, options) {
            return _this.request(urlPath, __assign(__assign({}, options), { method: METHODS.PUT }));
        };
        this.post = function (urlPath, options) {
            return _this.request(urlPath, __assign(__assign({}, options), { method: METHODS.POST }));
        };
        this.delete = function (urlPath, options) {
            return _this.request(urlPath, __assign(__assign({}, options), { method: METHODS.DELETE }));
        };
        this.request = function (urlPath, options) {
            var _a = options.timeout, timeout = _a === void 0 ? 5000 : _a, _b = options.withCredentials, withCredentials = _b === void 0 ? false : _b, _c = options.method, method = _c === void 0 ? METHODS.GET : _c, headers = options.headers, data = options.data;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.timeout = timeout;
                xhr.withCredentials = withCredentials;
                xhr.open(method, "" + _this.baseUrl + urlPath);
                xhr.onload = function () {
                    resolve(handleApiResponse(xhr));
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (data) {
                    if (typeof data === 'string') {
                        xhr.setRequestHeader('Content-type', 'text/html');
                    }
                    else if (!(data instanceof FormData)) {
                        xhr.setRequestHeader('Content-type', 'application/json');
                    }
                }
                xhr.setRequestHeader('accept', 'application/json');
                if (typeof headers === "object") {
                    for (var headerName in headers) {
                        xhr.setRequestHeader(headerName, headers[headerName]);
                    }
                }
                if (method === METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    if (data instanceof FormData) {
                        xhr.send(data);
                    }
                    else {
                        xhr.send(JSON.stringify(data));
                    }
                }
            });
        };
        this.baseUrl = baseUrl;
    }
    return HTTPTransport;
}());
export { HTTPTransport };
export function fetchWithRetry(baseUrl, urlPath, options) {
    var _a = options.tries, tries = _a === void 0 ? 2 : _a;
    function onError(err) {
        var triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }
        return fetchWithRetry(baseUrl, urlPath, __assign(__assign({}, options), { tries: triesLeft }));
    }
    return (new HTTPTransport(baseUrl).get(urlPath, options)).catch(onError);
}
