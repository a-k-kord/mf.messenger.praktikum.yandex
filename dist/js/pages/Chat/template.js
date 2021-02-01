export default "\n<main class=\"dialogs\">\n    <div class=\"dialogs__wrap\">\n        <div class=\"dialogs__aside-panel\">\n            <nav class=\"profile-link\">\n                <a class=\"link text text--size--small text--align--right text--theme--label icon-arrow-right\"\n                   href=\"profile.html\">\u041F\u0440\u043E\u0444\u0438\u043B\u044C\n                </a>\n            </nav>\n            <div class=\"search dialogs__search\">\n                <input class=\"search__input\" type=\"text\" placeholder=\"\u041F\u043E\u0438\u0441\u043A\">\n                <i class=\"fa fa-search input__icon\"></i>\n            </div>\n            <div class=\"scroller-wrap\">\n                <div class=\"scroller\">\n                    <ul class=\"chat-list__items\">\n                        <% for(let i=0; i<20; i++) {%>\n                        <li class=\"chat-item\">\n                            <a class=\"chat-item__inner\">\n                                <div class=\"avatar chat-item__avatar\">\n                                    <div class=\"avatar__image\">\n                                        <img class=\"image\" src=\"img/avatar_placeholder.svg\" alt=\"Avatar\">\n                                    </div>\n                                </div>\n                                <div class=\"chat-item__msg-wrap\">\n                                    <div class=\"chat-item__name text text--size--small text--weight--bold\">\u0410\u043D\u0434\u0440\u0435\u0439\n                                    \u0414\u043B\u0438\u043D\u043D\u043E\u0438\u043C\u044F\u043D\u043D\u044B\u0439</div>\n                                    <div class=\"chat-item__msg text text--size--smaller text--theme--label\">\u0422\u0430\u043A\n                                    \u0443\u0432\u043B\u0451\u043A\u0441\u044F\n                                    \u0440\u0430\u0431\u043E\u0442\u043E\u0439 \u043F\u043E \u043A\u0443\u0440\u0441\u0443, \u0447\u0442\u043E \u0441\u043E\u0432\u0441\u0435\u043C \u0437\u0430\u0431\u044B\u043B \u0435\u0433\u043E \u0430\u043D\u043E\u043D\u0441\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043E\u0432\u0441\u0435\u043C</div>\n                                </div>\n                                <span class=\"chat-item__date text text--size--tiny text--theme--label\">10 \u041C\u0430\u044F\n                                        2020</span>\n                                <div class=\"chat-item__badge \">\n                                    <div\n                                            class=\"chat-item__counter text text--size--smaller text--theme--label box box--center\">\n                                        2</div>\n                                </div>\n                            </a>\n                        </li>\n                        <% } %>\n                        \n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"chat-content dialogs__chat-content\">\n        <div class=\"chat-content__header\">\n            <div class=\"chat-content__avatar-wrap\">\n                <div class=\"avatar chat-content__avatar\">\n                    <div class=\"avatar__image\">\n                        <img class=\"image\" src=\"img/avatar_placeholder.svg\" alt=\"Avatar\">\n                    </div>\n                </div>\n            </div>\n            <div class=\"text text--align--left text--size--small text--weight--bold avatar__title\">\u0410\u043D\u0434\u0440\u0435\u0439</div>\n            <div class=\"dropdown\">\n                <button class=\"button dropdown__toggle dropdown__toggle--with-round-background\">\n                    <svg class=\"dropdown__icon  dropdown__icon--small\" width=\"100%\" height=\"100%\" viewBox=\"0 0 3 16\"\n                         fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <circle cx=\"1.5\" cy=\"2\" r=\"1.5\" />\n                        <circle cx=\"1.5\" cy=\"8\" r=\"1.5\" />\n                        <circle cx=\"1.5\" cy=\"14\" r=\"1.5\" />\n                    </svg>\n                </button>\n                <ul class=\"dropdown__list dropdown__list--down-left\">\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#add-user-popup\">\n                            <img class=\"image dropdown__image box box--round-border--circle\" src=\"img/plus.svg\"\n                                 alt=\"Add member to chat\">\n                            <span class=\"text text--size--small\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#remove-user-popup\">\n                            <img class=\"image dropdown__image box box--round-border--circle\" src=\"img/close.svg\"\n                                 alt=\"Delete member from chat\">\n                            <span class=\"text text--size--small\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#remove-chat-popup\">\n                            <img class=\"image dropdown__image box box--round-border--circle\" src=\"img/close.svg\"\n                                 alt=\"Delete member from chat\">\n                            <span class=\"text text--size--small text--theme--danger\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0447\u0430\u0442</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"history chat-content__history \">\n            <div class=\"history__inner scroller\">\n                <div class=\"history__message-wrap\">\n                    <div\n                            class=\"history__date-split text text--align--center text--size--smaller text--theme--label\">\n                        19 \u0438\u044E\u043D\u044F</div>\n                </div>\n                <div class=\"message history__message-wrap history__message-wrap--align--left\">\n                    <div class=\"message__text message__text--left\">\n                        <div class=\"text text--size--small\">\n                            \u041F\u0440\u0438\u0432\u0435\u0442! \u0421\u043C\u043E\u0442\u0440\u0438, \u0442\u0443\u0442 \u0432\u0441\u043F\u043B\u044B\u043B \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0439 \u043A\u0443\u0441\u043E\u043A \u043B\u0443\u043D\u043D\u043E\u0439 \u043A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u2014 \u041D\u0410\u0421\u0410 \u0432 \u043A\u0430\u043A\u043E\u0439-\u0442\u043E\n                            \u043C\u043E\u043C\u0435\u043D\u0442 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u043B\u0430 \u0425\u0430\u0441\u0441\u0435\u043B\u044C\u0431\u043B\u0430\u0434 \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C SWC \u0434\u043B\u044F \u043F\u043E\u043B\u0435\u0442\u043E\u0432 \u043D\u0430 \u041B\u0443\u043D\u0443. \u0421\u0435\u0439\u0447\u0430\u0441 \u043C\u044B \u0432\u0441\u0435\n                            \u0437\u043D\u0430\u0435\u043C \u0447\u0442\u043E \u0430\u0441\u0442\u0440\u043E\u043D\u0430\u0432\u0442\u044B \u043B\u0435\u0442\u0430\u043B\u0438 \u0441 \u043C\u043E\u0434\u0435\u043B\u044C\u044E 500 EL \u2014 \u0438 \u043A \u0441\u043B\u043E\u0432\u0443 \u0433\u043E\u0432\u043E\u0440\u044F, \u0432\u0441\u0435 \u0442\u0443\u0448\u043A\u0438 \u044D\u0442\u0438\u0445 \u043A\u0430\u043C\u0435\u0440\n                            \u0432\u0441\u0435\n                            \u0435\u0449\u0435 \u043D\u0430\u0445\u043E\u0434\u044F\u0442\u0441\u044F \u043D\u0430 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u041B\u0443\u043D\u044B, \u0442\u0430\u043A \u043A\u0430\u043A \u0430\u0441\u0442\u0440\u043E\u043D\u0430\u0432\u0442\u044B \u0441 \u0441\u043E\u0431\u043E\u0439 \u0437\u0430\u0431\u0440\u0430\u043B\u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u0430\u0441\u0441\u0435\u0442\u044B \u0441\n                            \u043F\u043B\u0435\u043D\u043A\u043E\u0439.\n\n                            \u0425\u0430\u0441\u0441\u0435\u043B\u044C\u0431\u043B\u0430\u0434 \u0432 \u0438\u0442\u043E\u0433\u0435 \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u043E\u0432\u0430\u043B SWC \u0434\u043B\u044F \u043A\u043E\u0441\u043C\u043E\u0441\u0430, \u043D\u043E \u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A \u0438 \u043D\u0430 \u0440\u0430\u043A\u0435\u0442\u0443 \u043E\u043D\u0438\n                            \u0442\u0430\u043A\n                            \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u0438 \u043D\u0435 \u043F\u043E\u043F\u0430\u043B\u0438. \u0412\u0441\u0435\u0433\u043E \u0438\u0445 \u0431\u044B\u043B\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u043E 25 \u0448\u0442\u0443\u043A, \u043E\u0434\u043D\u0443 \u0438\u0437 \u043D\u0438\u0445 \u043D\u0435\u0434\u0430\u0432\u043D\u043E \u043F\u0440\u043E\u0434\u0430\u043B\u0438 \u043D\u0430\n                            \u0430\u0443\u043A\u0446\u0438\u043E\u043D\u0435 \u0437\u0430 45000 \u0435\u0432\u0440\u043E.\n                        </div>\n                        <div class=\"badge text text--theme--label text--size--tiny\">11:56</div>\n                    </div>\n                </div>\n                <div class=\"message history__message-wrap history__message-wrap--align--left\">\n                    <div class=\"message__photo\">\n                        <img class=\"image  box box--round-border--small\" src=\"img/chat-image.png\" alt=\"photo\">\n                        <div\n                                class=\"badge text text--theme--light text--size--tiny box box--round-border--big box--background--label\">\n                            11:56</div>\n                    </div>\n                </div>\n                <div class=\"history__message-wrap history__message-wrap--align--right\">\n                    <div class=\"message__text message__text--right text text--size--small\">\n                        <div class=\"text text--size--small\">\u041A\u0440\u0443\u0442\u043E!</div>\n                        <div class=\"badge\">\n                            <img class=\"confirmation\" src=\"img/confirmation_msg_read.svg\"\n                                 alt=\"Confirmation about message recieved and read\">\n                            <div class=\"timestamp text text--size--tiny text--theme--primary\">11:56</div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"message history__message-wrap history__message-wrap--align--left\">\n                    <div class=\"message__text message__text--left\">\n                        <div class=\"text text--size--small\">\n                            Yeeeeeeh!\n                        </div>\n                        <div class=\"badge text text--theme--label text--size--tiny\">11:56</div>\n                    </div>\n                </div>\n                <div class=\"history__message-wrap history__message-wrap--align--right\">\n                    <div class=\"message__text message__text--right text text--size--small \">\n                        <div class=\"text text--size--small\">\n                            \u0410 \u0447\u0442\u043E \u0431\u044B\u043B\u043E \u0434\u043E:\n                            \u0425\u0430\u0441\u0441\u0435\u043B\u044C\u0431\u043B\u0430\u0434 \u0432 \u0438\u0442\u043E\u0433\u0435 \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u043E\u0432\u0430\u043B SWC \u0434\u043B\u044F \u043A\u043E\u0441\u043C\u043E\u0441\u0430, \u043D\u043E \u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A \u0438 \u043D\u0430 \u0440\u0430\u043A\u0435\u0442\u0443 \u043E\u043D\u0438\n                            \u0442\u0430\u043A\n                            \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u0438 \u043D\u0435 \u043F\u043E\u043F\u0430\u043B\u0438. \u0412\u0441\u0435\u0433\u043E \u0438\u0445 \u0431\u044B\u043B\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u043E 25 \u0448\u0442\u0443\u043A, \u043E\u0434\u043D\u0443 \u0438\u0437 \u043D\u0438\u0445 \u043D\u0435\u0434\u0430\u0432\u043D\u043E \u043F\u0440\u043E\u0434\u0430\u043B\u0438 \u043D\u0430\n                            \u0430\u0443\u043A\u0446\u0438\u043E\u043D\u0435 \u0437\u0430 45000 \u0435\u0432\u0440\u043E.\n                        </div>\n                        <div class=\"badge\">\n                            <img class=\"confirmation\" src=\"img/confirmation_msg_recieved.svg\"\n                                 alt=\"Confirmation about message recieved and read\">\n                            <div class=\"timestamp text text--size--tiny text--theme--primary\">11:56</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"chat-content__footer\">\n            <div class=\"dropdown\">\n                <button class=\"button dropdown__toggle\">\n                    <svg class=\"dropdown__icon\" width=\"100%\" height=\"100%\" viewBox=\"0 0 32 32\" fill=\"currentColor\"\n                         xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M9.70067 16.014L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70067 16.014Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M17.5574 23.8706L25.1335 16.2945L26.0763 17.2373L18.5002 24.8134L17.5574 23.8706Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48304 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z\" />\n                    </svg>\n                </button>\n                <ul class=\"dropdown__list dropdown__list--up-right\">\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-photo-video\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-photo.svg\"\n                                 alt=\"Photo or video attachment\">\n                            <span class=\"text text--size--small\">\u0424\u043E\u0442\u043E \u0438\u043B\u0438 \u0432\u0438\u0434\u0435\u043E</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-file\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-file.svg\"\n                                 alt=\"File attachment\">\n                            <span class=\"text text--size--small\">\u0424\u0430\u0439\u043B</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-location\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-location.svg\"\n                                 alt=\"Location attachment\">\n                            <span class=\"text text--size--small\">\u041B\u043E\u043A\u0430\u0446\u0438\u044F</span>\n                        </a>\n                    </li>\n\n                </ul>\n            </div>\n\n            <form class=\"form form--width--full\">\n                <input class=\"message-input\" type=\"text\" placeholder=\"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\" value=\"\" id=\"message\"\n                       name=\"message\">\n                <%~ it.slots.buttonSend.outerHTML %>\n            </form>\n        </div>\n        <div class=\"chat-content__default\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0447\u0430\u0442 \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</div>\n    </div>\n</main>\n\n<div class=\"popup\" id=\"add-user-popup\">\n    <a href=\"#\" class=\"popup__close\">&times;</a>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</h1>\n        <div class=\"form__content\">\n           <%~ it.slots.login.outerHTML %>\n        </div>\n        <%~ it.slots.buttonAdd.outerHTML %>\n    </form>\n</div>\n\n<div class=\"popup\" id=\"remove-user-popup\">\n    <a href=\"#\" class=\"popup__close\">&times;</a>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</h1>\n        <div class=\"form__content\">\n            <%~ it.slots.login.outerHTML %>\n            \n        </div>\n        <%~ it.slots.buttonRemoveUser.outerHTML %>\n    </form>\n</div>\n\n<div class=\"popup\" id=\"remove-chat-popup\">\n    <a href=\"#\" class=\"popup__close\">&times;</a>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0447\u0430\u0442</h1>\n        <div class=\"form__content\">\n            <div class=\"form__item\">\n                <label class=\"text text--size--small text--theme--label text--align--center\">\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435\n                    \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0439 \u0447\u0430\u0442?</label>\n            </div>\n        </div>\n        <%~ it.slots.buttonRemoveChat.outerHTML %>\n        <div class=\"form__link\">\n            <a class=\"link text--size--small text--theme--primary\" href=\"#\">\u041E\u0442\u043C\u0435\u043D\u0430</a>\n        </div>\n    </form>\n</div>\n\n";