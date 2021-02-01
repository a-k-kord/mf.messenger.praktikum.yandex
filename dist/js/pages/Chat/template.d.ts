declare const _default: "\n<main class=\"dialogs\">\n    <div class=\"dialogs__wrap\">\n        <div class=\"dialogs__aside-panel\">\n            <nav class=\"profile-link\">\n                <a class=\"link text text--size--small text--align--right text--theme--label icon-arrow-right\"\n                   href=\"profile.html\">Профиль\n                </a>\n            </nav>\n            <div class=\"search dialogs__search\">\n                <input class=\"search__input\" type=\"text\" placeholder=\"Поиск\">\n                <i class=\"fa fa-search input__icon\"></i>\n            </div>\n            <div class=\"scroller-wrap\">\n                <div class=\"scroller\">\n                    <ul class=\"chat-list__items\">\n                        <% for(let i=0; i<20; i++) {%>\n                        <li class=\"chat-item\">\n                            <a class=\"chat-item__inner\">\n                                <div class=\"avatar chat-item__avatar\">\n                                    <div class=\"avatar__image\">\n                                        <img class=\"image\" src=\"img/avatar_placeholder.svg\" alt=\"Avatar\">\n                                    </div>\n                                </div>\n                                <div class=\"chat-item__msg-wrap\">\n                                    <div class=\"chat-item__name text text--size--small text--weight--bold\">Андрей\n                                    Длинноимянный</div>\n                                    <div class=\"chat-item__msg text text--size--smaller text--theme--label\">Так\n                                    увлёкся\n                                    работой по курсу, что совсем забыл его анонсировать совсем</div>\n                                </div>\n                                <span class=\"chat-item__date text text--size--tiny text--theme--label\">10 Мая\n                                        2020</span>\n                                <div class=\"chat-item__badge \">\n                                    <div\n                                            class=\"chat-item__counter text text--size--smaller text--theme--label box box--center\">\n                                        2</div>\n                                </div>\n                            </a>\n                        </li>\n                        <% } %>\n                        \n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"chat-content dialogs__chat-content\">\n        <div class=\"chat-content__header\">\n            <div class=\"chat-content__avatar-wrap\">\n                <div class=\"avatar chat-content__avatar\">\n                    <div class=\"avatar__image\">\n                        <img class=\"image\" src=\"img/avatar_placeholder.svg\" alt=\"Avatar\">\n                    </div>\n                </div>\n            </div>\n            <div class=\"text text--align--left text--size--small text--weight--bold avatar__title\">Андрей</div>\n            <div class=\"dropdown\">\n                <button class=\"button dropdown__toggle dropdown__toggle--with-round-background\">\n                    <svg class=\"dropdown__icon  dropdown__icon--small\" width=\"100%\" height=\"100%\" viewBox=\"0 0 3 16\"\n                         fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <circle cx=\"1.5\" cy=\"2\" r=\"1.5\" />\n                        <circle cx=\"1.5\" cy=\"8\" r=\"1.5\" />\n                        <circle cx=\"1.5\" cy=\"14\" r=\"1.5\" />\n                    </svg>\n                </button>\n                <ul class=\"dropdown__list dropdown__list--down-left\">\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#add-user-popup\">\n                            <img class=\"image dropdown__image box box--round-border--circle\" src=\"img/plus.svg\"\n                                 alt=\"Add member to chat\">\n                            <span class=\"text text--size--small\">Добавить пользователя</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#remove-user-popup\">\n                            <img class=\"image dropdown__image box box--round-border--circle\" src=\"img/close.svg\"\n                                 alt=\"Delete member from chat\">\n                            <span class=\"text text--size--small\">Удалить пользователя</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#remove-chat-popup\">\n                            <img class=\"image dropdown__image box box--round-border--circle\" src=\"img/close.svg\"\n                                 alt=\"Delete member from chat\">\n                            <span class=\"text text--size--small text--theme--danger\">Удалить чат</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"history chat-content__history \">\n            <div class=\"history__inner scroller\">\n                <div class=\"history__message-wrap\">\n                    <div\n                            class=\"history__date-split text text--align--center text--size--smaller text--theme--label\">\n                        19 июня</div>\n                </div>\n                <div class=\"message history__message-wrap history__message-wrap--align--left\">\n                    <div class=\"message__text message__text--left\">\n                        <div class=\"text text--size--small\">\n                            Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то\n                            момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все\n                            знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер\n                            все\n                            еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с\n                            пленкой.\n\n                            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они\n                            так\n                            никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на\n                            аукционе за 45000 евро.\n                        </div>\n                        <div class=\"badge text text--theme--label text--size--tiny\">11:56</div>\n                    </div>\n                </div>\n                <div class=\"message history__message-wrap history__message-wrap--align--left\">\n                    <div class=\"message__photo\">\n                        <img class=\"image  box box--round-border--small\" src=\"img/chat-image.png\" alt=\"photo\">\n                        <div\n                                class=\"badge text text--theme--light text--size--tiny box box--round-border--big box--background--label\">\n                            11:56</div>\n                    </div>\n                </div>\n                <div class=\"history__message-wrap history__message-wrap--align--right\">\n                    <div class=\"message__text message__text--right text text--size--small\">\n                        <div class=\"text text--size--small\">Круто!</div>\n                        <div class=\"badge\">\n                            <img class=\"confirmation\" src=\"img/confirmation_msg_read.svg\"\n                                 alt=\"Confirmation about message recieved and read\">\n                            <div class=\"timestamp text text--size--tiny text--theme--primary\">11:56</div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"message history__message-wrap history__message-wrap--align--left\">\n                    <div class=\"message__text message__text--left\">\n                        <div class=\"text text--size--small\">\n                            Yeeeeeeh!\n                        </div>\n                        <div class=\"badge text text--theme--label text--size--tiny\">11:56</div>\n                    </div>\n                </div>\n                <div class=\"history__message-wrap history__message-wrap--align--right\">\n                    <div class=\"message__text message__text--right text text--size--small \">\n                        <div class=\"text text--size--small\">\n                            А что было до:\n                            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они\n                            так\n                            никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на\n                            аукционе за 45000 евро.\n                        </div>\n                        <div class=\"badge\">\n                            <img class=\"confirmation\" src=\"img/confirmation_msg_recieved.svg\"\n                                 alt=\"Confirmation about message recieved and read\">\n                            <div class=\"timestamp text text--size--tiny text--theme--primary\">11:56</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"chat-content__footer\">\n            <div class=\"dropdown\">\n                <button class=\"button dropdown__toggle\">\n                    <svg class=\"dropdown__icon\" width=\"100%\" height=\"100%\" viewBox=\"0 0 32 32\" fill=\"currentColor\"\n                         xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M9.70067 16.014L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70067 16.014Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M17.5574 23.8706L25.1335 16.2945L26.0763 17.2373L18.5002 24.8134L17.5574 23.8706Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48304 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z\" />\n                    </svg>\n                </button>\n                <ul class=\"dropdown__list dropdown__list--up-right\">\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-photo-video\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-photo.svg\"\n                                 alt=\"Photo or video attachment\">\n                            <span class=\"text text--size--small\">Фото или видео</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-file\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-file.svg\"\n                                 alt=\"File attachment\">\n                            <span class=\"text text--size--small\">Файл</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-location\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-location.svg\"\n                                 alt=\"Location attachment\">\n                            <span class=\"text text--size--small\">Локация</span>\n                        </a>\n                    </li>\n\n                </ul>\n            </div>\n\n            <form class=\"form form--width--full\">\n                <input class=\"message-input\" type=\"text\" placeholder=\"Сообщение\" value=\"\" id=\"message\"\n                       name=\"message\">\n                <%~ it.slots.buttonSend.outerHTML %>\n            </form>\n        </div>\n        <div class=\"chat-content__default\">Выберите чат чтобы отправить сообщение</div>\n    </div>\n</main>\n\n<div class=\"popup\" id=\"add-user-popup\">\n    <a href=\"#\" class=\"popup__close\">&times;</a>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">Добавить пользователя</h1>\n        <div class=\"form__content\">\n           <%~ it.slots.login.outerHTML %>\n        </div>\n        <%~ it.slots.buttonAdd.outerHTML %>\n    </form>\n</div>\n\n<div class=\"popup\" id=\"remove-user-popup\">\n    <a href=\"#\" class=\"popup__close\">&times;</a>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">Удалить пользователя</h1>\n        <div class=\"form__content\">\n            <%~ it.slots.login.outerHTML %>\n            \n        </div>\n        <%~ it.slots.buttonRemoveUser.outerHTML %>\n    </form>\n</div>\n\n<div class=\"popup\" id=\"remove-chat-popup\">\n    <a href=\"#\" class=\"popup__close\">&times;</a>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">Удалить чат</h1>\n        <div class=\"form__content\">\n            <div class=\"form__item\">\n                <label class=\"text text--size--small text--theme--label text--align--center\">Вы уверены, что хотите\n                    удалить данный чат?</label>\n            </div>\n        </div>\n        <%~ it.slots.buttonRemoveChat.outerHTML %>\n        <div class=\"form__link\">\n            <a class=\"link text--size--small text--theme--primary\" href=\"#\">Отмена</a>\n        </div>\n    </form>\n</div>\n\n";
export default _default;