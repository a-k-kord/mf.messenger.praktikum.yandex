var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from '../../core/Block/index.js';
var Error = (function (_super) {
    __extends(Error, _super);
    function Error(props) {
        return _super.call(this, props) || this;
    }
    Error.prototype.render = function () {
        return compileTemplate(template, this.props);
    };
    return Error;
}(Block));
function render(query, block) {
    var root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
var error404 = new Error({
    errNum: '404',
    errorMsg: 'Не туда попали'
});
render("#app", error404);
