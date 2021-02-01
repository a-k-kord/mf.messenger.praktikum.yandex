export var createDocumentElement = function (tagName) {
    return document.createElement(tagName);
};
export var applyStyles = function (nodes, styles) {
    var targetNodes = [].concat(nodes);
    Object.keys(styles)
        .forEach(function (key) {
        var value = styles[key];
        if (typeof value !== 'undefined') {
            targetNodes.forEach(function (node) {
                node && node.style && (node.style[key] = value);
            });
        }
    });
    return nodes;
};
export var appendNodeWithStyles = function (parent, tag, styles, html, onClick) {
    var node = document.createElement(tag);
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
export var preventEvent = function (event) {
    event.preventDefault();
    event.stopPropagation();
};
export var removeHTMLElement = function (element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        return true;
    }
    return false;
};
export var sanitizeHTML = function (html) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
};
export var hide = function (el) {
    if (!el.style.display || el.style.display === 'block') {
        applyStyles(el, { display: 'none' });
    }
};
export var show = function (el) {
    if (!el.style.display || el.style.display === 'none') {
        applyStyles(el, { display: 'block' });
    }
};
