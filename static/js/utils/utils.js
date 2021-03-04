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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
export function isPlainObject(value) {
    return (typeof value === "object" &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === "[object Object]");
}
export function isArray(value) {
    return Array.isArray(value);
}
export function merge(lhs, rhs) {
    var result = {};
    if (!isPlainObject(rhs) && isPlainObject(lhs)) {
        return Object.assign({}, lhs);
    }
    if (!isPlainObject(lhs) && isPlainObject(rhs)) {
        return Object.assign({}, rhs);
    }
    Object.entries(rhs).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        var lhsValue = lhs[key];
        if (isPlainObject(value) && isPlainObject(lhsValue)) {
            result[key] = merge(lhsValue, value);
        }
        if (!isPlainObject(lhsValue)) {
            if (isPlainObject(value)) {
                result[key] = Object.assign({}, value);
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
                result[key] = Object.assign({}, value);
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
    var reg = new RegExp("[" + chars + "]", "gi");
    return string.replace(reg, "");
}
export function isArraysEqual(aValArray, bValArray) {
    if (aValArray.length === bValArray.length) {
        for (var j = 0; j < aValArray.length; j++) {
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
            else if (typeof aValArray[j] !== "object" &&
                typeof bValArray[j] !== "object") {
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
        for (var i = 0; i < aEntries.length; i++) {
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
                else if (typeof aEntries[i][1] !== "object" &&
                    typeof bEntries[i][1] !== "object") {
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
    var e_1, _a, e_2, _b;
    var res;
    if (isArray(obj)) {
        res = [];
        try {
            for (var obj_1 = __values(obj), obj_1_1 = obj_1.next(); !obj_1_1.done; obj_1_1 = obj_1.next()) {
                var entry = obj_1_1.value;
                if (isArray(entry)) {
                    res.push(cloneDeep(entry));
                }
                else if (isPlainObject(entry)) {
                    res.push(cloneDeep(entry));
                }
                else {
                    res.push(entry);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (obj_1_1 && !obj_1_1.done && (_a = obj_1.return)) _a.call(obj_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else if (isPlainObject(obj)) {
        res = {};
        try {
            for (var _c = __values(Object.entries(obj)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], val = _e[1];
                res[key] = isArray(val) || isPlainObject(val) ? cloneDeep(val) : val;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    else {
        res = obj;
    }
    return res;
}
function isArrayOrObject(value) {
    return isPlainObject(value) || isArray(value);
}
function getKey(key, parentKey) {
    return parentKey ? parentKey + "[" + key + "]" : key;
}
function getParams(data, parentKey) {
    var e_3, _a;
    var result = [];
    try {
        for (var _b = __values(Object.entries(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (isArrayOrObject(value)) {
                result.push.apply(result, __spread(getParams(value, getKey(key, parentKey))));
            }
            else {
                result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return result;
}
export function queryString(data) {
    if (!data) {
        return '';
    }
    else if (!isPlainObject(data)) {
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
    }
    return json;
}
