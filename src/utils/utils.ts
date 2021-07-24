export type PlainObject<T = unknown> = {
    // eslint-disable-next-line no-unused-vars
    [key in string]: T;
};
export type PlainObjectOrUnknown = PlainObject | unknown;
// type StringIndexed = Record<string, any>;

export function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object'
        && value !== null
        && value.constructor === Object // не функция или массив
        && Object.prototype.toString.call(value) === '[object Object]' // не встроенный объект(типа Date)
    );
}

export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
    const result: PlainObject = {};
    if (!isPlainObject(rhs) && isPlainObject(lhs)) {
        return { ...lhs };
    }
    if (!isPlainObject(lhs) && isPlainObject(rhs)) {
        return { ...rhs };
    }

    Object.entries(rhs).forEach(([key, value]) => {
        const lhsValue: PlainObjectOrUnknown = lhs[key];
        if (isPlainObject(value) && isPlainObject(lhsValue)) {
            result[key] = merge(lhsValue as PlainObject, value as PlainObject);
        }
        if (!isPlainObject(lhsValue)) {
            if (isPlainObject(value)) {
                result[key] = { ...value };
            } else {
                result[key] = value;
            }
        }
    });

    Object.entries(lhs).forEach(([key, value]) => {
        const resultEl: PlainObjectOrUnknown = result[key];
        if (resultEl === undefined) {
            if (isPlainObject(value)) {
                result[key] = { ...value };
            } else {
                result[key] = value;
            }
        }
    });

    return result;
}

export function set(
    object: PlainObject | unknown,
    path: string, value: unknown,
): PlainObject | unknown {
    if (typeof path !== 'string' || !path) {
        throw new Error('path must be string');
    }
    if (!isPlainObject(object)) {
        return object;
    }
    let firstKey;
    const pathObj = path.split('.').reduceRight((acc, key) => {
        firstKey = key;
        return { [key]: acc };
    }, value);

    const mergedObj = merge(object, pathObj as PlainObject);
    object[firstKey] = mergedObj[firstKey];
    return object;
}

export function trim(string: string, chars?: string): string {
    if (string && !chars) {
        return string.trim();
    }

    const reg = new RegExp(`[${chars}]`, 'gi');
    return string.replace(reg, '');
}

export function isArraysEqual(aValArray: [], bValArray: []): boolean {
    // если длины массивов не равны, то сразу false
    if (aValArray.length === bValArray.length) {
        for (let j = 0; j < aValArray.length; j += 1) {
            // если оба значения объекты, то рекурсия на объектах
            if (isPlainObject(aValArray[j]) && isPlainObject(bValArray[j])) {
                const res = isEqual(aValArray[j], bValArray[j]);
                if (!res) {
                    return false;
                }
                // если оба значения массивы рекурсия на масивах
            } else if (isArray(aValArray[j]) && isArray(bValArray[j])) {
                const res = isArraysEqual(aValArray[j], bValArray[j]);
                if (!res) {
                    return false;
                }
                // если оба значения примитивы и не равны
            } else if (
                typeof aValArray[j] !== 'object'
                && typeof bValArray[j] !== 'object'
            ) {
                if (aValArray[j] !== bValArray[j]) {
                    return false;
                }
                // в противном случае типы разные
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

// функция принимает на вход объекты, которые содержат в себе примитивы, объекты и массивы.
export function isEqual(a: object, b: object): boolean {
    const aEntries = Object.entries(a);
    const bEntries = Object.entries(b);
    // если длины массивов не равны, то сразу false
    if (aEntries.length === bEntries.length) {
        for (let i = 0; i < aEntries.length; i += 1) {
            if (aEntries[i][0] === bEntries[i][0]) {
                // если оба значения объекты, то рекурсия
                if (isPlainObject(aEntries[i][1]) && isPlainObject(bEntries[i][1])) {
                    const res = isEqual(aEntries[i][1], bEntries[i][1]);
                    if (!res) {
                        return false;
                    }
                    // если оба значения массивы
                } else if (isArray(aEntries[i][1]) && isArray(bEntries[i][1])) {
                    // сравниваем массивы
                    const res = isArraysEqual(aEntries[i][1] as [], bEntries[i][1] as []);
                    if (!res) {
                        return false;
                    }
                    // если оба значения примитивы и не равны
                } else if (
                    typeof aEntries[i][1] !== 'object'
                    && typeof bEntries[i][1] !== 'object'
                ) {
                    if (aEntries[i][1] !== bEntries[i][1]) {
                        return false;
                    }
                    // в противном случае типы разные
                } else {
                    return false;
                }
            } else {
                // ключи не равны
                return false;
            }
        }
    } else {
        // количество эл-в не одинаково
        return false;
    }
    return true;
}

export function cloneDeep<T extends object = object>(obj: T): T {
    if (isArray(obj)) {
        return obj.map((entry) => {
            if (isArray(entry) || isPlainObject(entry)) {
                return cloneDeep(entry);
            }
                return entry;
        }) as T;
    } if (isPlainObject(obj)) {
        return Object.entries(obj).reduce((acc, [key, val]) => ({
                ...acc,
                [key]: isArray(val) || isPlainObject(val) ? cloneDeep(val) : val,
            }), {}) as T;
    }
        return obj;
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string): [string, string][] {
    const result: [string, string][] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        } else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }

    return result;
}

export function queryString(data: PlainObject | undefined): string {
    if (!data) {
        return '';
    } if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }

    return getParams(data).map((arr) => arr.join('=')).join('&');
}

export function toJson(data: string): PlainObject {
    let json = { data };
    try {
        json = JSON.parse(data);
    } catch (err) {
        logger(err.message);
    }
    return json;
}

export function logger(...args) {
    // console.log(...args);
}
