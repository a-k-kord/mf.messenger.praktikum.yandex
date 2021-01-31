import '../../../vendor/eta.min.js';
export function compileTemplate(template, props) {
    return Eta.render(template, props);
}
