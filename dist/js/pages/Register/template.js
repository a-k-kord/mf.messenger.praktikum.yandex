export default "\n<form class=\"form form--columns box box--round-border--small  box--has-shadow box--center\">\n    <h1 class=\"form__title text\">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</h1>\n\n    <div class=\"form__content\">\n            <%~ it.slots.email.outerHTML %>\n            <%~ it.slots.login.outerHTML %>\n            <%~ it.slots.firstName.outerHTML %>\n            <%~ it.slots.secondName.outerHTML %>\n            <%~ it.slots.phone.outerHTML %>\n            <%~ it.slots.password.outerHTML %>\n            <%~ it.slots.passwordConfirm.outerHTML %>\n    </div>\n\n        <%~ it.slots.button.outerHTML %>\n        <%~ it.slots.link.outerHTML %>\n</form>\n";
