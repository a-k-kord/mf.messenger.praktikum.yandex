export declare type PlainObject<T = unknown> = {
    [key in string]: T;
};
export declare type PlainObjectOrUnknown = PlainObject | unknown;
export declare function isPlainObject(value: unknown): value is PlainObject;
export declare function isArray(value: unknown): value is [];
export declare function merge(lhs: PlainObject, rhs: PlainObject): PlainObject;
export declare function set(object: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown;
export declare function trim(string: string, chars?: string): string;
export declare function isArraysEqual(aValArray: [], bValArray: []): boolean;
export declare function isEqual(a: object, b: object): boolean;
export declare function cloneDeep<T extends object = object>(obj: T): T;
export declare function queryString(data: PlainObject): string;
