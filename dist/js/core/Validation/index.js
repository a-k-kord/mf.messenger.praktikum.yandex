var Validation = (function () {
    function Validation() {
        this.listeners = {};
    }
    Validation.prototype.addListener = function (el, event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        el.addEventListener(event, callback);
        this.listeners[event].push(callback);
    };
    Validation.prototype.removeListener = function (el, event, callback) {
        if (!this.listeners[event]) {
            throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: " + event);
        }
        this.listeners[event] = this.listeners[event].filter(function (listener) {
            if (listener !== callback) {
                el.removeEventListener(event, callback);
                return true;
            }
            return false;
        });
    };
    Validation.prototype.removeAllListeners = function (el) {
        var _this = this;
        Object.keys(this.listeners).map(function (event) {
            _this.listeners[event].map(function (callback) {
                el.removeEventListener(event, callback);
            });
        });
    };
    return Validation;
}());
export { Validation };
