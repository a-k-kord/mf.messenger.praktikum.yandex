(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Eta = {}));
}(this, (function (exports) {
    'use strict';
    function setPrototypeOf(obj, proto) {
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(obj, proto);
        }
        else {
            obj.__proto__ = proto;
        }
    }
    function EtaErr(message) {
        var err = new Error(message);
        setPrototypeOf(err, EtaErr.prototype);
        return err;
    }
    EtaErr.prototype = Object.create(Error.prototype, {
        name: { value: 'Eta Error', enumerable: false }
    });
    function ParseErr(message, str, indx) {
        var whitespace = str.slice(0, indx).split(/\n/);
        var lineNo = whitespace.length;
        var colNo = whitespace[lineNo - 1].length + 1;
        message +=
            ' at line ' +
                lineNo +
                ' col ' +
                colNo +
                ':\n\n' +
                '  ' +
                str.split(/\n/)[lineNo - 1] +
                '\n' +
                '  ' +
                Array(colNo).join(' ') +
                '^';
        throw EtaErr(message);
    }
    var promiseImpl = new Function('return this')().Promise;
    function getAsyncFunctionConstructor() {
        try {
            return new Function('return (async function(){}).constructor')();
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                throw EtaErr("This environment doesn't support async/await");
            }
            else {
                throw e;
            }
        }
    }
    function trimLeft(str) {
        if (!!String.prototype.trimLeft) {
            return str.trimLeft();
        }
        else {
            return str.replace(/^\s+/, '');
        }
    }
    function trimRight(str) {
        if (!!String.prototype.trimRight) {
            return str.trimRight();
        }
        else {
            return str.replace(/\s+$/, '');
        }
    }
    function hasOwnProp(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function copyProps(toObj, fromObj) {
        for (var key in fromObj) {
            if (hasOwnProp(fromObj, key)) {
                toObj[key] = fromObj[key];
            }
        }
        return toObj;
    }
    function trimWS(str, config, wsLeft, wsRight) {
        var leftTrim;
        var rightTrim;
        if (Array.isArray(config.autoTrim)) {
            leftTrim = config.autoTrim[1];
            rightTrim = config.autoTrim[0];
        }
        else {
            leftTrim = rightTrim = config.autoTrim;
        }
        if (wsLeft || wsLeft === false) {
            leftTrim = wsLeft;
        }
        if (wsRight || wsRight === false) {
            rightTrim = wsRight;
        }
        if (!rightTrim && !leftTrim) {
            return str;
        }
        if (leftTrim === 'slurp' && rightTrim === 'slurp') {
            return str.trim();
        }
        if (leftTrim === '_' || leftTrim === 'slurp') {
            str = trimLeft(str);
        }
        else if (leftTrim === '-' || leftTrim === 'nl') {
            str = str.replace(/^(?:\r\n|\n|\r)/, '');
        }
        if (rightTrim === '_' || rightTrim === 'slurp') {
            str = trimRight(str);
        }
        else if (rightTrim === '-' || rightTrim === 'nl') {
            str = str.replace(/(?:\r\n|\n|\r)$/, '');
        }
        return str;
    }
    var escMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    function replaceChar(s) {
        return escMap[s];
    }
    function XMLEscape(str) {
        var newStr = String(str);
        if (/[&<>"']/.test(newStr)) {
            return newStr.replace(/[&<>"']/g, replaceChar);
        }
        else {
            return newStr;
        }
    }
    var templateLitReg = /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\${)[^\\`])*`/g;
    var singleQuoteReg = /'(?:\\[\s\w"'\\`]|[^\n\r'\\])*?'/g;
    var doubleQuoteReg = /"(?:\\[\s\w"'\\`]|[^\n\r"\\])*?"/g;
    function escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    }
    function parse(str, config) {
        var buffer = [];
        var trimLeftOfNextStr = false;
        var lastIndex = 0;
        var parseOptions = config.parse;
        if (config.plugins) {
            for (var i = 0; i < config.plugins.length; i++) {
                var plugin = config.plugins[i];
                if (plugin.processTemplate) {
                    str = plugin.processTemplate(str, config);
                }
            }
        }
        if (config.rmWhitespace) {
            str = str.replace(/[\r\n]+/g, '\n').replace(/^\s+|\s+$/gm, '');
        }
        templateLitReg.lastIndex = 0;
        singleQuoteReg.lastIndex = 0;
        doubleQuoteReg.lastIndex = 0;
        function pushString(strng, shouldTrimRightOfString) {
            if (strng) {
                strng = trimWS(strng, config, trimLeftOfNextStr, shouldTrimRightOfString);
                if (strng) {
                    strng = strng.replace(/\\|'/g, '\\$&').replace(/\r\n|\n|\r/g, '\\n');
                    buffer.push(strng);
                }
            }
        }
        var prefixes = [parseOptions.exec, parseOptions.interpolate, parseOptions.raw].reduce(function (accumulator, prefix) {
            if (accumulator && prefix) {
                return accumulator + '|' + escapeRegExp(prefix);
            }
            else if (prefix) {
                return escapeRegExp(prefix);
            }
            else {
                return accumulator;
            }
        }, '');
        var parseOpenReg = new RegExp('([^]*?)' + escapeRegExp(config.tags[0]) + '(-|_)?\\s*(' + prefixes + ')?\\s*', 'g');
        var parseCloseReg = new RegExp('\'|"|`|\\/\\*|(\\s*(-|_)?' + escapeRegExp(config.tags[1]) + ')', 'g');
        var m;
        while ((m = parseOpenReg.exec(str))) {
            lastIndex = m[0].length + m.index;
            var precedingString = m[1];
            var wsLeft = m[2];
            var prefix = m[3] || '';
            pushString(precedingString, wsLeft);
            parseCloseReg.lastIndex = lastIndex;
            var closeTag = void 0;
            var currentObj = false;
            while ((closeTag = parseCloseReg.exec(str))) {
                if (closeTag[1]) {
                    var content = str.slice(lastIndex, closeTag.index);
                    parseOpenReg.lastIndex = lastIndex = parseCloseReg.lastIndex;
                    trimLeftOfNextStr = closeTag[2];
                    var currentType = prefix === parseOptions.exec
                        ? 'e'
                        : prefix === parseOptions.raw
                            ? 'r'
                            : prefix === parseOptions.interpolate
                                ? 'i'
                                : '';
                    currentObj = { t: currentType, val: content };
                    break;
                }
                else {
                    var char = closeTag[0];
                    if (char === '/*') {
                        var commentCloseInd = str.indexOf('*/', parseCloseReg.lastIndex);
                        if (commentCloseInd === -1) {
                            ParseErr('unclosed comment', str, closeTag.index);
                        }
                        parseCloseReg.lastIndex = commentCloseInd;
                    }
                    else if (char === "'") {
                        singleQuoteReg.lastIndex = closeTag.index;
                        var singleQuoteMatch = singleQuoteReg.exec(str);
                        if (singleQuoteMatch) {
                            parseCloseReg.lastIndex = singleQuoteReg.lastIndex;
                        }
                        else {
                            ParseErr('unclosed string', str, closeTag.index);
                        }
                    }
                    else if (char === '"') {
                        doubleQuoteReg.lastIndex = closeTag.index;
                        var doubleQuoteMatch = doubleQuoteReg.exec(str);
                        if (doubleQuoteMatch) {
                            parseCloseReg.lastIndex = doubleQuoteReg.lastIndex;
                        }
                        else {
                            ParseErr('unclosed string', str, closeTag.index);
                        }
                    }
                    else if (char === '`') {
                        templateLitReg.lastIndex = closeTag.index;
                        var templateLitMatch = templateLitReg.exec(str);
                        if (templateLitMatch) {
                            parseCloseReg.lastIndex = templateLitReg.lastIndex;
                        }
                        else {
                            ParseErr('unclosed string', str, closeTag.index);
                        }
                    }
                }
            }
            if (currentObj) {
                buffer.push(currentObj);
            }
            else {
                ParseErr('unclosed tag', str, m.index + precedingString.length);
            }
        }
        pushString(str.slice(lastIndex, str.length), false);
        if (config.plugins) {
            for (var i = 0; i < config.plugins.length; i++) {
                var plugin = config.plugins[i];
                if (plugin.processAST) {
                    buffer = plugin.processAST(buffer, config);
                }
            }
        }
        return buffer;
    }
    function compileToString(str, config) {
        var buffer = parse(str, config);
        var res = "var tR='',__l,__lP" +
            (config.include ? ',include=E.include.bind(E)' : '') +
            (config.includeFile ? ',includeFile=E.includeFile.bind(E)' : '') +
            '\nfunction layout(p,d){__l=p;__lP=d}\n' +
            (config.useWith ? 'with(' + config.varName + '||{}){' : '') +
            compileScope(buffer, config) +
            (config.includeFile
                ? 'if(__l)tR=' +
                    (config.async ? 'await ' : '') +
                    ("includeFile(__l,Object.assign(" + config.varName + ",{body:tR},__lP))\n")
                : config.include
                    ? 'if(__l)tR=' +
                        (config.async ? 'await ' : '') +
                        ("include(__l,Object.assign(" + config.varName + ",{body:tR},__lP))\n")
                    : '') +
            'if(cb){cb(null,tR)} return tR' +
            (config.useWith ? '}' : '');
        if (config.plugins) {
            for (var i = 0; i < config.plugins.length; i++) {
                var plugin = config.plugins[i];
                if (plugin.processFnString) {
                    res = plugin.processFnString(res, config);
                }
            }
        }
        return res;
    }
    function compileScope(buff, config) {
        var i = 0;
        var buffLength = buff.length;
        var returnStr = '';
        for (i; i < buffLength; i++) {
            var currentBlock = buff[i];
            if (typeof currentBlock === 'string') {
                var str = currentBlock;
                returnStr += "tR+='" + str + "'\n";
            }
            else {
                var type = currentBlock.t;
                var content = currentBlock.val || '';
                if (type === 'r') {
                    if (config.filter) {
                        content = 'E.filter(' + content + ')';
                    }
                    returnStr += 'tR+=' + content + '\n';
                }
                else if (type === 'i') {
                    if (config.filter) {
                        content = 'E.filter(' + content + ')';
                    }
                    if (config.autoEscape) {
                        content = 'E.e(' + content + ')';
                    }
                    returnStr += 'tR+=' + content + '\n';
                }
                else if (type === 'e') {
                    returnStr += content + '\n';
                }
            }
        }
        return returnStr;
    }
    var Cacher = (function () {
        function Cacher(cache) {
            this.cache = cache;
        }
        Cacher.prototype.define = function (key, val) {
            this.cache[key] = val;
        };
        Cacher.prototype.get = function (key) {
            return this.cache[key];
        };
        Cacher.prototype.remove = function (key) {
            delete this.cache[key];
        };
        Cacher.prototype.reset = function () {
            this.cache = {};
        };
        Cacher.prototype.load = function (cacheObj) {
            copyProps(this.cache, cacheObj);
        };
        return Cacher;
    }());
    var templates = new Cacher({});
    function includeHelper(templateNameOrPath, data) {
        var template = this.templates.get(templateNameOrPath);
        if (!template) {
            throw EtaErr('Could not fetch template "' + templateNameOrPath + '"');
        }
        return template(data, this);
    }
    var config = {
        async: false,
        autoEscape: true,
        autoTrim: [false, 'nl'],
        cache: false,
        e: XMLEscape,
        include: includeHelper,
        parse: {
            exec: '',
            interpolate: '=',
            raw: '~'
        },
        plugins: [],
        rmWhitespace: false,
        tags: ['<%', '%>'],
        templates: templates,
        useWith: false,
        varName: 'it'
    };
    function getConfig(override, baseConfig) {
        var res = {};
        copyProps(res, config);
        if (baseConfig) {
            copyProps(res, baseConfig);
        }
        if (override) {
            copyProps(res, override);
        }
        return res;
    }
    function configure(options) {
        return copyProps(config, options);
    }
    function compile(str, config) {
        var options = getConfig(config || {});
        var ctor = options.async ? getAsyncFunctionConstructor() : Function;
        try {
            return new ctor(options.varName, 'E', 'cb', compileToString(str, options));
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                throw EtaErr('Bad template syntax\n\n' +
                    e.message +
                    '\n' +
                    Array(e.message.length + 1).join('=') +
                    '\n' +
                    compileToString(str, options) +
                    '\n');
            }
            else {
                throw e;
            }
        }
    }
    function handleCache(template, options) {
        if (options.cache && options.name && options.templates.get(options.name)) {
            return options.templates.get(options.name);
        }
        var templateFunc = typeof template === 'function' ? template : compile(template, options);
        if (options.cache && options.name) {
            options.templates.define(options.name, templateFunc);
        }
        return templateFunc;
    }
    function render(template, data, config, cb) {
        var options = getConfig(config || {});
        if (options.async) {
            if (cb) {
                try {
                    var templateFn = handleCache(template, options);
                    templateFn(data, options, cb);
                }
                catch (err) {
                    return cb(err);
                }
            }
            else {
                if (typeof promiseImpl === 'function') {
                    return new promiseImpl(function (resolve, reject) {
                        try {
                            resolve(handleCache(template, options)(data, options));
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                }
                else {
                    throw EtaErr("Please provide a callback function, this env doesn't support Promises");
                }
            }
        }
        else {
            return handleCache(template, options)(data, options);
        }
    }
    function renderAsync(template, data, config, cb) {
        return render(template, data, Object.assign({}, config, { async: true }), cb);
    }
    exports.compile = compile;
    exports.compileToString = compileToString;
    exports.config = config;
    exports.configure = configure;
    exports.defaultConfig = config;
    exports.getConfig = getConfig;
    exports.parse = parse;
    exports.render = render;
    exports.renderAsync = renderAsync;
    exports.templates = templates;
    Object.defineProperty(exports, '__esModule', { value: true });
})));
