export const generateId = (length: number = 4): string => {
    let result: string = '';
    for (let i = 0; i < length; i += 1) {
        result += Math.random().toString(16).slice(-4);
    }
    return result;
}

export const isInDom = (node: HTMLElement): boolean => {
    return !!node.parentElement;
}

export const createBlockDocumentElement = (blockName: string, tagName: string = 'div'): HTMLElement => {
    const el = document.createElement(tagName);
    el.dataset.blockId = generateId();
    el.dataset.blockName = blockName;
    el.classList.add('block-wrapper');
    return el;
}

export const applyStyles = (nodes: HTMLElement | HTMLElement[], styles: object): HTMLElement | HTMLElement[] => {
    const targetNodes = [].concat(nodes)
    Object.keys(styles)
        .forEach((key) => {
            const value = styles[key]
            if (typeof value !== 'undefined') {
                targetNodes.forEach((node) => {
                    node && node.style && (node.style[key] = value)
                })
            }
        })
    return nodes
}

export const appendNodeWithStyles = (parent: HTMLElement, tag: string, styles: object | string, html: string, onClick?: (this: HTMLElement, ev: MouseEvent) => any): HTMLElement => {
    const node = document.createElement(tag)
    switch (typeof styles) {
        case 'object':
            applyStyles(node, styles)
            break
        case 'string':
            node.className = styles
            break
        default:
    }
    node.innerHTML = html || ''
    if (onClick) {
        node.addEventListener('click', onClick)
    }
    return parent.appendChild(node)

}

export const preventEvent = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
}

export const removeHTMLElement = (element: HTMLElement): boolean => {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        return true;
    }
    return false;
}

export const sanitizeHTML = (html: string): string => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
}

export const hide = (el: HTMLElement): void => {
    if (!el.style.display || el.style.display === 'block') {
        applyStyles(el, { display: 'none' })
    }
}

export const show = (el: HTMLElement): void => {
    if (!el.style.display || el.style.display === 'none') {
        applyStyles(el, { display: 'block' })
    }
}