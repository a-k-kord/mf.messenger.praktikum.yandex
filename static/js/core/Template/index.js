import '../../vendor/eta.min.js';
var Eta = window.Eta;
export function compileTemplate(template, props) {
    return Eta.render(template, props);
}
