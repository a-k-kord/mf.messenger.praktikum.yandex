import '../../vendor/eta.min.js';
export function compileTemplate(template, props) {
    return window.Eta.render(template, props);
}
