declare const _default: "\n\n<main class=\"dialogs\">\n    <div class=\"dialogs__wrap\">\n        <div class=\"dialogs__aside-panel\">\n            <div class=\"dialogs__menu-panel\">\n                <div class=\"dropdown \">\n                    <button class=\"button dropdown__toggle dropdown__toggle--with-round-background\">\n                        <svg class=\"dropdown__icon  dropdown__icon--small\" width=\"100%\" height=\"100%\" viewBox=\"0 0 3 16\"\n                             fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <circle cx=\"1.5\" cy=\"2\" r=\"1.5\" />\n                            <circle cx=\"1.5\" cy=\"8\" r=\"1.5\" />\n                            <circle cx=\"1.5\" cy=\"14\" r=\"1.5\" />\n                        </svg>\n                    </button>\n                    <ul class=\"dropdown__list\">\n                        <li class=\"dropdown__item-wrap\">\n                            <%~ it.slots?.linkShowAddChatPopup.outerHTML %>\n                        </li>\n                    </ul>\n                </div>\n                <%~ it.slots?.linkToProfile.outerHTML %>\n            </div>\n            <div class=\"search dialogs__search\">\n                <input class=\"search__input\" type=\"text\" placeholder=\"Поиск\">\n                <i class=\"fa fa-search input__icon\"></i>\n            </div>\n            <div class=\"scroller-wrap\">\n                <div class=\"scroller\">\n                    <ul class=\"chat-list__items\">\n                    <% const handleSelectChatItem = it.props?.handleSelectChatItem %>\n                        <% if(typeof it.props?.chats === 'object') {\n                            for(let [id, {title, unreadCount, lastMessage}] of Object.entries(it.props?.chats)) { %>\n                        <li class=\"chat-item <%= it.props?.selectedChatItemId == id ? 'chat-item--selected' : '' %>\"  >\n                            <a class=\"chat-item__inner\" data-chat-item-id=\"<%= id %>\">\n                                <div class=\"avatar chat-item__avatar\">\n                                    <div class=\"avatar__image\">\n                                        <img class=\"image\" src=\"img/avatar_placeholder.svg\" alt=\"Avatar\">\n                                    </div>\n                                </div>\n                                <div class=\"chat-item__msg-wrap\">\n                                    <div class=\"chat-item__name text text--size--small text--weight--bold\"><%= title %></div>\n                                    <div class=\"chat-item__msg text text--size--smaller text--theme--label\"><%= lastMessage ? lastMessage.content : '' %></div>\n                                </div>\n                                <span class=\"chat-item__date text text--size--tiny text--theme--label\">\n                                <%= lastMessage ? (new Date(lastMessage.time)).toLocaleDateString('ru', {day: 'numeric',month: 'long',year: 'numeric',}).replace(' г.', '') : '' %>\n                                </span>\n                                <% if(unreadCount) { %>\n                                <div class=\"chat-item__badge \">\n                                    <div class=\"chat-item__counter text text--size--smaller text--theme--label box box--center\"><%= unreadCount || '' %></div>\n                                </div>\n                                <% } %>\n                            </a>\n                        </li>\n                        <% }\n                        } %>\n\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"chat-content dialogs__chat-content\">\n        <% if(it.props?.selectedChatItemId) { %>\n        <div class=\"chat-content__header\">\n            <div class=\"chat-content__avatar-wrap\">\n                <div class=\"avatar chat-content__avatar\">\n                    <div class=\"avatar__image\">\n                        <img class=\"image\" src=\"img/avatar_placeholder.svg\" alt=\"Avatar\">\n                    </div>\n                </div>\n            </div>\n            <div class=\"text text--align--left text--size--small text--weight--bold avatar__title\">\n                <%= it.props?.chats && it.props?.selectedChatItemId ? it.props?.chats[it.props?.selectedChatItemId]?.title : ''%>\n            </div>\n            <div class=\"text text--size--small text--theme--label\">\n                Пользователей:\n            </div>\n            <%~ it.slots?.chatUsersCountLabel.outerHTML %>\n            <div class=\"dropdown\">\n                <button class=\"button dropdown__toggle dropdown__toggle--with-round-background\">\n                    <svg class=\"dropdown__icon  dropdown__icon--small\" width=\"100%\" height=\"100%\" viewBox=\"0 0 3 16\"\n                         fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <circle cx=\"1.5\" cy=\"2\" r=\"1.5\" />\n                        <circle cx=\"1.5\" cy=\"8\" r=\"1.5\" />\n                        <circle cx=\"1.5\" cy=\"14\" r=\"1.5\" />\n                    </svg>\n                </button>\n                <ul class=\"dropdown__list dropdown__list--down-left\">\n                    <li class=\"dropdown__item-wrap\">\n                        <%~ it.slots?.linkShowAddUserPopup.outerHTML %>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <%~ it.slots?.linkShowRemoveUserPopup.outerHTML %>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <%~ it.slots?.linkShowRemoveChatPopup.outerHTML %>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"history chat-content__history \">\n            <div class=\"history__inner scroller\">\n                <%\n                const messages = it.props?.chats[it.props?.selectedChatItemId]?.messages ?? [];\n                let currentDay = '';\n                for(const message of messages) {\n                %> \n                <% \n                if(message.user_id === it.props?.myUserId) {\n                %>\n                <div class=\"message history__message-wrap history__message-wrap--align--right\">\n                    <div class=\"message__text message__text--right text text--size--small\">\n                        <div class=\"text text--size--small\"><%= message.content %></div>\n                        <div class=\"badge\">\n                        <% if(message.id) {\n                            const badgeType = message.is_read ? 'read' : 'recieved';  \n                        %>\n                            <img class=\"confirmation\" src=\"img/confirmation_msg_<%= badgeType %>.svg\"\n                                 alt=\"Confirmation about message recieved and read\">\n                        <% } %>\n                            <div class=\"timestamp text text--size--tiny text--theme--primary\">\n                                <%= (new Date(message.time)).toLocaleString('ru', {hour: 'numeric',minute: 'numeric'}) %>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <% } else { %>\n                <div class=\"message history__message-wrap history__message-wrap--align--left\">\n                    <div class=\"message__text message__text--left\">\n                        <div class=\"text text--size--small\">\n                            <%= message.content %>\n                        </div>\n                        <div class=\"badge text text--theme--label text--size--tiny\">\n                            <%= (new Date(message.time)).toLocaleString('ru', {hour: 'numeric',minute: 'numeric'}) %>\n                        </div>\n                    </div>\n                </div>\n                <% } %>\n                 <% \n                    const date = new Date(message.time);\n                    const now = new Date();\n                    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();\n                    const dateStr = isToday ? 'Сегодня' : date.toLocaleDateString('ru', {day: 'numeric',month: 'long'});\n                    currentDay = currentDay ? currentDay : dateStr;\n                    if(message.time && currentDay !== dateStr || message === messages[messages.length - 1]) {\n                %>   \n                    <div class=\"history__message-wrap\">\n                        <div class=\"history__date-split text text--align--center text--size--smaller text--theme--label\">\n                            <%= currentDay%>\n                        </div>\n                    </div>\n                <%\n                    currentDay = dateStr; \n                } \n                if(message === messages[messages.length - 1]) {\n                %>\n                    <div class=\"load-more-messages\"> &nbsp; </div>\n                <% } %>\n                <% } %>\n            </div>\n        </div>\n        \n        <div class=\"chat-content__footer\">\n            <div class=\"dropdown\">\n                <button class=\"button dropdown__toggle\">\n                    <svg class=\"dropdown__icon\" width=\"100%\" height=\"100%\" viewBox=\"0 0 32 32\" fill=\"currentColor\"\n                         xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M9.70067 16.014L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70067 16.014Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M17.5574 23.8706L25.1335 16.2945L26.0763 17.2373L18.5002 24.8134L17.5574 23.8706Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48304 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z\" />\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z\" />\n                    </svg>\n                </button>\n                <ul class=\"dropdown__list dropdown__list--up-right\">\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-photo-video\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-photo.svg\"\n                                 alt=\"Photo or video attachment\">\n                            <span class=\"text text--size--small\">Фото или видео</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-file\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-file.svg\"\n                                 alt=\"File attachment\">\n                            <span class=\"text text--size--small\">Файл</span>\n                        </a>\n                    </li>\n                    <li class=\"dropdown__item-wrap\">\n                        <a class=\"dropdown__item\" href=\"#attach-location\">\n                            <img class=\"dropdown__image dropdown__image--size--medium\" src=\"img/attach-location.svg\"\n                                 alt=\"Location attachment\">\n                            <span class=\"text text--size--small\">Локация</span>\n                        </a>\n                    </li>\n\n                </ul>\n            </div>\n            \n            <form class=\"form form--width--full\" onsubmit=\"this.children[1]?.children[0]?.dispatchEvent(new Event('click')); return false;\" autocomplete=\"off\">\n                <%~ it.slots?.messageToSend.outerHTML %>\n                <%~ it.slots?.buttonSend.outerHTML %>\n            </form>\n        </div>\n        <% console.log(it.slots?.buttonSend.innerHTML)} else {%>\n        <div class=\"chat-content__default box box--center\">Выберите чат чтобы отправить сообщение</div>\n        <% } %>\n    </div>\n</main>\n\n<div  class=\"popup\" style=\"display:none\" id=\"add-chat-popup\">\n    <%~ it.slots?.linkCloseAddChatPopup.outerHTML %>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">Добавить чат</h1>\n        <div class=\"form__content\">\n           <%~ it.slots?.addChatTitle.outerHTML %>\n        </div>\n        <%~ it.slots?.buttonAddChat.outerHTML %>\n    </form>\n</div>\n\n<div  class=\"popup\" style=\"display:none\" id=\"add-user-popup\">\n    <%~ it.slots?.linkCloseAddUserPopup.outerHTML %>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">Добавить пользователя</h1>\n        <div class=\"form__content\">\n           <%~ it.slots?.addLogin.outerHTML %>\n        </div>\n        <%~ it.slots?.buttonAddUser.outerHTML %>\n    </form>\n</div>\n\n<div  class=\"popup\" style=\"display:none\" id=\"remove-user-popup\">\n    <%~ it.slots?.linkCloseRemoveUserPopup.outerHTML %>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">Удалить пользователя</h1>\n        <div class=\"form__content\">\n            <%~ it.slots?.removeLogin.outerHTML %>\n\n        </div>\n        <%~ it.slots?.buttonRemoveUser.outerHTML %>\n    </form>\n</div>\n\n<div  class=\"popup\" style=\"display:none\" id=\"remove-chat-popup\">\n    <%~ it.slots?.linkCloseRemoveChatPopup.outerHTML %>\n    <form class=\"form form--columns box box--round-border--small box--has-shadow box--center popup__inner\">\n        <h1 class=\"form__title text text--align--center\">Удалить чат</h1>\n        <div class=\"form__content\">\n            <div class=\"form__item\">\n                <label class=\"text text--size--small text--theme--label text--align--center\">Вы уверены, что хотите\n                    удалить данный чат?</label>\n            </div>\n        </div>\n        <%~ it.slots?.buttonRemoveChat.outerHTML %>\n    </form>\n</div>\n\n";
export default _default;
