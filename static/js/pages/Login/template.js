export default "\n<form class=\"form form--columns box box--round-border--small  box--has-shadow box--center\">\n    <h1 class=\"form__title text\">\u0412\u0445\u043E\u0434</h1>\n    <div class=\"form__content form__content--with-min-height\">\n            <%~ it.slots?.login.outerHTML %>\n            <%~ it.slots?.password.outerHTML %>\n    </div>\n        <%~ it.slots?.button.outerHTML %>\n        <%~ it.slots?.link.outerHTML %>\n</form>\n";
