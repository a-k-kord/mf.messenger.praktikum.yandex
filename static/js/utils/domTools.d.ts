export declare const createDocumentElement: (tagName: string) => HTMLElement;
export declare const applyStyles: (nodes: HTMLElement | HTMLElement[], styles: object) => HTMLElement | HTMLElement[];
export declare const appendNodeWithStyles: (parent: HTMLElement, tag: string, styles: object | string, html: string, onClick?: (this: HTMLElement, ev: MouseEvent) => any) => HTMLElement;
export declare const preventEvent: (event: Event) => void;
export declare const removeHTMLElement: (element: HTMLElement) => boolean;
export declare const sanitizeHTML: (html: string) => string;
export declare const hide: (el: HTMLElement) => void;
export declare const show: (el: HTMLElement) => void;
