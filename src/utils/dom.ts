import '../vendor/uuid_v4.min.js';

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        uuidv4: () => string;
    }
}

export const generateId = (): string => window.uuidv4();

export const isInDom = (node: HTMLElement): boolean => !!node.closest('body');

export const createBlockDocumentElement = (blockName: string, tagName: string = 'div'): HTMLElement => {
    const el = document.createElement(tagName);
    el.setAttribute('data-block-id', generateId());
    el.setAttribute('data-block-name', blockName);
    el.classList.add('block-wrapper');
    return el;
};

export const applyStyles = (
    nodes: HTMLElement | HTMLElement[],
    styles: object,
): HTMLElement | HTMLElement[] => {
    const targetNodes = [].concat(nodes);
    Object.keys(styles)
        .forEach((key) => {
            const value = styles[key];
            if (typeof value !== 'undefined') {
                targetNodes.forEach((node) => {
                    if (node && node.style) {
                        // eslint-disable-next-line no-param-reassign
                        node.style[key] = value;
                    }
                });
            }
        });
    return nodes;
};

export const appendNodeWithStyles = (
    parent: HTMLElement, tag: string,
    styles: object | string,
    html: string,
    onClick?: () => any,
): HTMLElement => {
    const node = document.createElement(tag);
    switch (typeof styles) {
        case 'object':
            applyStyles(node, styles);
            break;
        case 'string':
            node.className = styles;
            break;
        default:
    }
    node.innerHTML = html || '';
    if (onClick) {
        node.addEventListener('click', onClick);
    }
    return parent.appendChild(node);
};

export const preventEvent = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
};

export const removeHTMLElement = (element: HTMLElement): boolean => {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        return true;
    }
    return false;
};

export const sanitizeHTML = (html: string): string => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
};

export const hide = (el: HTMLElement): void => {
    if (!el.style.display || el.style.display === 'contents') {
        applyStyles(el, { display: 'none' });
    }
};

export const show = (el: HTMLElement): void => {
    if (!el.style.display || el.style.display === 'none') {
        applyStyles(el, { display: 'contents' });
    }
};
