// eslint-disable-next-line import/no-default-export
export default `

<main class="dialogs">
    <div class="dialogs__wrap">
        <div class="dialogs__aside-panel">
            <div class="dialogs__menu-panel">
                <div class="dropdown ">
                    <button class="button dropdown__toggle dropdown__toggle--with-round-background">
                        <svg class="dropdown__icon  dropdown__icon--small" width="100%" height="100%" viewBox="0 0 3 16"
                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="1.5" cy="2" r="1.5" />
                            <circle cx="1.5" cy="8" r="1.5" />
                            <circle cx="1.5" cy="14" r="1.5" />
                        </svg>
                    </button>
                    <ul class="dropdown__list">
                        <li class="dropdown__item-wrap">
                            <%~ it.slots?.linkShowAddChatPopup.outerHTML %>
                        </li>
                    </ul>
                </div>
                <%~ it.slots?.linkToProfile.outerHTML %>
            </div>
            <div class="search dialogs__search">
                <input class="search__input" type="text" placeholder="Поиск">
                <i class="fa fa-search input__icon"></i>
            </div>
            <div class="scroller-wrap">
                <div class="scroller">
                    <ul class="chat-list__items">
                    <% const handleSelectChatItem = it.props?.handleSelectChatItem %>
                        <% if(typeof it.props?.chats === 'object') {
                            for(let [id, {title, unreadCount, lastMessage}] of Object.entries(it.props?.chats)) {%>
                        <li class="chat-item <%= it.props?.selectedChatItemId == id ? 'chat-item--selected' : '' %>"  >
                            <a class="chat-item__inner" data-chat-item-id="<%= id %>">
                                <div class="avatar chat-item__avatar">
                                    <div class="avatar__image">
                                        <img class="image" src="img/avatar_placeholder.svg" alt="Avatar">
                                    </div>
                                </div>
                                <div class="chat-item__msg-wrap">
                                    <div class="chat-item__name text text--size--small text--weight--bold"><%= title %></div>
                                    <div class="chat-item__msg text text--size--smaller text--theme--label"><%= lastMessage ? lastMessage.content : '' %></div>
                                </div>
                                <span class="chat-item__date text text--size--tiny text--theme--label">
                                <%= lastMessage ? (new Date(lastMessage.time)).toLocaleDateString('ru', {day: 'numeric',month: 'long',year: 'numeric',}).replace(' г.', '') : '' %>
                                </span>
                                <% if(unreadCount) { %>
                                <div class="chat-item__badge ">
                                    <div class="chat-item__counter text text--size--smaller text--theme--label box box--center"><%= unreadCount || '' %></div>
                                </div>
                                <% } %>
                            </a>
                        </li>
                        <% }
                        } %>

                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="chat-content dialogs__chat-content">
        <% if(it.props?.selectedChatItemId) { %>
        <div class="chat-content__header">
            <div class="chat-content__avatar-wrap">
                <div class="avatar chat-content__avatar">
                    <div class="avatar__image">
                        <img class="image" src="img/avatar_placeholder.svg" alt="Avatar">
                    </div>
                </div>
            </div>
            <div class="text text--align--left text--size--small text--weight--bold avatar__title">
                <%= it.props?.chats && it.props?.selectedChatItemId ? it.props?.chats[it.props?.selectedChatItemId]?.title : ''%>
            </div>
            <div class="text text--size--small text--theme--label">
                Пользователей:
            </div>
            <%~ it.slots?.chatUsersCountLabel.outerHTML %>
            <div class="dropdown">
                <button class="button dropdown__toggle dropdown__toggle--with-round-background">
                    <svg class="dropdown__icon  dropdown__icon--small" width="100%" height="100%" viewBox="0 0 3 16"
                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.5" cy="2" r="1.5" />
                        <circle cx="1.5" cy="8" r="1.5" />
                        <circle cx="1.5" cy="14" r="1.5" />
                    </svg>
                </button>
                <ul class="dropdown__list dropdown__list--down-left">
                    <li class="dropdown__item-wrap">
                        <%~ it.slots?.linkShowAddUserPopup.outerHTML %>
                    </li>
                    <li class="dropdown__item-wrap">
                        <%~ it.slots?.linkShowRemoveUserPopup.outerHTML %>
                    </li>
                    <li class="dropdown__item-wrap">
                        <%~ it.slots?.linkShowRemoveChatPopup.outerHTML %>
                    </li>
                </ul>
            </div>
        </div>
        <div class="history chat-content__history ">
            <div class="history__inner scroller">
                <%
                const messages = it.props?.chats[it.props?.selectedChatItemId]?.messages ?? [];
                let currentDay = '';
                for(const message of messages) {
                %> 
                <% 
                if(message.user_id === it.props?.myUserId) {
                %>
                <div data-msg-id="<%= message.id %>" class="message history__message-wrap history__message-wrap--align--right">
                    <div class="message__text message__text--right text text--size--small">
                        <div class="text text--size--small"><%= message.content %></div>
                        <div class="badge">
                        <% if(message.id) {
                            const badgeType = message.is_read ? 'read' : 'recieved';  
                        %>
                            <img class="confirmation" src="img/confirmation_msg_<%= badgeType %>.svg"
                                 alt="Confirmation about message recieved and read">
                        <% } %>
                            <div class="timestamp text text--size--tiny text--theme--primary">
                                <%= (new Date(message.time)).toLocaleString('ru', {hour: 'numeric',minute: 'numeric'}) %>
                            </div>
                        </div>
                    </div>
                </div>
                <% } else { %>
                <div class="message history__message-wrap history__message-wrap--align--left">
                    <div class="message__text message__text--left">
                        <div class="text text--size--small">
                            <%= message.content %>
                        </div>
                        <div class="badge text text--theme--label text--size--tiny">
                            <%= (new Date(message.time)).toLocaleString('ru', {hour: 'numeric',minute: 'numeric'}) %>
                        </div>
                    </div>
                </div>
                <% } %>
                 <% 
                    const date = new Date(message.time);
                    const now = new Date();
                    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                    const dateStr = isToday ? 'Сегодня' : date.toLocaleDateString('ru', {day: 'numeric',month: 'long'});
                    currentDay = currentDay ? currentDay : dateStr;
                    if(message.time && currentDay !== dateStr || message === messages[messages.length - 1]) {
                %>   
                    <div class="history__message-wrap">
                        <div class="history__date-split text text--align--center text--size--smaller text--theme--label">
                            <%= currentDay%>
                        </div>
                    </div>
                <%
                    currentDay = dateStr; 
                } 
                if(message === messages[messages.length - 1]) {
                %>
                    <div class="load-more-messages"> &nbsp; </div>
                <% } %>
                <% } %>
            </div>
        </div>
        
        <div class="chat-content__footer">
            <div class="dropdown">
                <button class="button dropdown__toggle">
                    <svg class="dropdown__icon" width="100%" height="100%" viewBox="0 0 32 32" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M9.70067 16.014L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70067 16.014Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M17.5574 23.8706L25.1335 16.2945L26.0763 17.2373L18.5002 24.8134L17.5574 23.8706Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48304 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" />
                    </svg>
                </button>
                <ul class="dropdown__list dropdown__list--up-right">
                    <li class="dropdown__item-wrap">
                        <a class="dropdown__item" href="#attach-photo-video">
                            <img class="dropdown__image dropdown__image--size--medium" src="img/attach-photo.svg"
                                 alt="Photo or video attachment">
                            <span class="text text--size--small">Фото или видео</span>
                        </a>
                    </li>
                    <li class="dropdown__item-wrap">
                        <a class="dropdown__item" href="#attach-file">
                            <img class="dropdown__image dropdown__image--size--medium" src="img/attach-file.svg"
                                 alt="File attachment">
                            <span class="text text--size--small">Файл</span>
                        </a>
                    </li>
                    <li class="dropdown__item-wrap">
                        <a class="dropdown__item" href="#attach-location">
                            <img class="dropdown__image dropdown__image--size--medium" src="img/attach-location.svg"
                                 alt="Location attachment">
                            <span class="text text--size--small">Локация</span>
                        </a>
                    </li>

                </ul>
            </div>

            <form class="form form--width--full" onsubmit="this.children[1]?.children[0]?.dispatchEvent(new Event('click')); return false;" autocomplete="off">
                <%~ it.slots?.messageToSend.outerHTML %>
                <%~ it.slots?.buttonSend.outerHTML %>
            </form>
        </div>
        <% } else {%>
        <div class="chat-content__default box box--center">Выберите чат чтобы отправить сообщение</div>
        <% } %>
    </div>
</main>

<div  class="popup" style="display:none" id="add-chat-popup">
    <%~ it.slots?.linkCloseAddChatPopup.outerHTML %>
    <form class="form form--columns box box--round-border--small box--has-shadow box--center popup__inner">
        <h1 class="form__title text text--align--center">Добавить чат</h1>
        <div class="form__content">
           <%~ it.slots?.addChatTitle.outerHTML %>
        </div>
        <%~ it.slots?.buttonAddChat.outerHTML %>
    </form>
</div>

<div  class="popup" style="display:none" id="add-user-popup">
    <%~ it.slots?.linkCloseAddUserPopup.outerHTML %>
    <form class="form form--columns box box--round-border--small box--has-shadow box--center popup__inner">
        <h1 class="form__title text text--align--center">Добавить пользователя</h1>
        <div class="form__content">
           <%~ it.slots?.addLogin.outerHTML %>
        </div>
        <%~ it.slots?.buttonAddUser.outerHTML %>
    </form>
</div>

<div  class="popup" style="display:none" id="remove-user-popup">
    <%~ it.slots?.linkCloseRemoveUserPopup.outerHTML %>
    <form class="form form--columns box box--round-border--small box--has-shadow box--center popup__inner">
        <h1 class="form__title text text--align--center">Удалить пользователя</h1>
        <div class="form__content">
            <%~ it.slots?.removeLogin.outerHTML %>

        </div>
        <%~ it.slots?.buttonRemoveUser.outerHTML %>
    </form>
</div>

<div  class="popup" style="display:none" id="remove-chat-popup">
    <%~ it.slots?.linkCloseRemoveChatPopup.outerHTML %>
    <form class="form form--columns box box--round-border--small box--has-shadow box--center popup__inner">
        <h1 class="form__title text text--align--center">Удалить чат</h1>
        <div class="form__content">
            <div class="form__item">
                <label class="text text--size--small text--theme--label text--align--center">Вы уверены, что хотите
                    удалить данный чат?</label>
            </div>
        </div>
        <%~ it.slots?.buttonRemoveChat.outerHTML %>
    </form>
</div>

`;
