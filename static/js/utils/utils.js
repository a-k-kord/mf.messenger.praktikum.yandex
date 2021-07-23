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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
export function isPlainObject(value) {
    return (typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]');
}
export function isArray(value) {
    return Array.isArray(value);
}
export function merge(lhs, rhs) {
    var result = {};
    if (!isPlainObject(rhs) && isPlainObject(lhs)) {
        return __assign({}, lhs);
    }
    if (!isPlainObject(lhs) && isPlainObject(rhs)) {
        return __assign({}, rhs);
    }
    Object.entries(rhs).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        var lhsValue = lhs[key];
        if (isPlainObject(value) && isPlainObject(lhsValue)) {
            result[key] = merge(lhsValue, value);
        }
        if (!isPlainObject(lhsValue)) {
            if (isPlainObject(value)) {
                result[key] = __assign({}, value);
            }
            else {
                result[key] = value;
            }
        }
    });
    Object.entries(lhs).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        var resultEl = result[key];
        if (resultEl === undefined) {
            if (isPlainObject(value)) {
                result[key] = __assign({}, value);
            }
            else {
                result[key] = value;
            }
        }
    });
    return result;
}
export function set(object, path, value) {
    if (typeof path !== 'string' || !path) {
        throw new Error('path must be string');
    }
    if (!isPlainObject(object)) {
        return object;
    }
    var firstKey;
    var pathObj = path.split('.').reduceRight(function (acc, key) {
        var _a;
        firstKey = key;
        return _a = {}, _a[key] = acc, _a;
    }, value);
    var mergedObj = merge(object, pathObj);
    object[firstKey] = mergedObj[firstKey];
    return object;
}
export function trim(string, chars) {
    if (string && !chars) {
        return string.trim();
    }
    var reg = new RegExp("[" + chars + "]", 'gi');
    return string.replace(reg, '');
}
export function isArraysEqual(aValArray, bValArray) {
    if (aValArray.length === bValArray.length) {
        for (var j = 0; j < aValArray.length; j += 1) {
            if (isPlainObject(aValArray[j]) && isPlainObject(bValArray[j])) {
                var res = isEqual(aValArray[j], bValArray[j]);
                if (!res) {
                    return false;
                }
            }
            else if (isArray(aValArray[j]) && isArray(bValArray[j])) {
                var res = isArraysEqual(aValArray[j], bValArray[j]);
                if (!res) {
                    return false;
                }
            }
            else if (typeof aValArray[j] !== 'object'
                && typeof bValArray[j] !== 'object') {
                if (aValArray[j] !== bValArray[j]) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
    return true;
}
export function isEqual(a, b) {
    var aEntries = Object.entries(a);
    var bEntries = Object.entries(b);
    if (aEntries.length === bEntries.length) {
        for (var i = 0; i < aEntries.length; i += 1) {
            if (aEntries[i][0] === bEntries[i][0]) {
                if (isPlainObject(aEntries[i][1]) && isPlainObject(bEntries[i][1])) {
                    var res = isEqual(aEntries[i][1], bEntries[i][1]);
                    if (!res) {
                        return false;
                    }
                }
                else if (isArray(aEntries[i][1]) && isArray(bEntries[i][1])) {
                    var res = isArraysEqual(aEntries[i][1], bEntries[i][1]);
                    if (!res) {
                        return false;
                    }
                }
                else if (typeof aEntries[i][1] !== 'object'
                    && typeof bEntries[i][1] !== 'object') {
                    if (aEntries[i][1] !== bEntries[i][1]) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
    return true;
}
export function cloneDeep(obj) {
    if (isArray(obj)) {
        return obj.map(function (entry) {
            if (isArray(entry) || isPlainObject(entry)) {
                return cloneDeep(entry);
            }
            return entry;
        });
    }
    if (isPlainObject(obj)) {
        return Object.entries(obj).reduce(function (acc, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], val = _c[1];
            return (__assign(__assign({}, acc), (_b = {}, _b[key] = isArray(val) || isPlainObject(val) ? cloneDeep(val) : val, _b)));
        }, {});
    }
    return obj;
}
function isArrayOrObject(value) {
    return isPlainObject(value) || isArray(value);
}
function getKey(key, parentKey) {
    return parentKey ? parentKey + "[" + key + "]" : key;
}
function getParams(data, parentKey) {
    var e_1, _a;
    var result = [];
    try {
        for (var _b = __values(Object.entries(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (isArrayOrObject(value)) {
                result.push.apply(result, __spreadArray([], __read(getParams(value, getKey(key, parentKey)))));
            }
            else {
                result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
export function queryString(data) {
    if (!data) {
        return '';
    }
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }
    return getParams(data).map(function (arr) { return arr.join('='); }).join('&');
}
export function toJson(data) {
    var json = { data: data };
    try {
        json = JSON.parse(data);
    }
    catch (err) {
        console.log(err.message);
    }
    return json;
}
