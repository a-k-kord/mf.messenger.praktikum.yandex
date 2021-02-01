export default `
<main class="dialogs">
    <div class="dialogs__wrap">
        <div class="dialogs__aside-panel">
            <nav class="profile-link">
                <a class="link text text--size--small text--align--right text--theme--label icon-arrow-right"
                   href="profile.html">Профиль
                </a>
            </nav>
            <div class="search dialogs__search">
                <input class="search__input" type="text" placeholder="Поиск">
                <i class="fa fa-search input__icon"></i>
            </div>
            <div class="scroller-wrap">
                <div class="scroller">
                    <ul class="chat-list__items">
                        <% for(let i=0; i<20; i++) {%>
                        <li class="chat-item">
                            <a class="chat-item__inner">
                                <div class="avatar chat-item__avatar">
                                    <div class="avatar__image">
                                        <img class="image" src="img/avatar_placeholder.svg" alt="Avatar">
                                    </div>
                                </div>
                                <div class="chat-item__msg-wrap">
                                    <div class="chat-item__name text text--size--small text--weight--bold">Андрей
                                    Длинноимянный</div>
                                    <div class="chat-item__msg text text--size--smaller text--theme--label">Так
                                    увлёкся
                                    работой по курсу, что совсем забыл его анонсировать совсем</div>
                                </div>
                                <span class="chat-item__date text text--size--tiny text--theme--label">10 Мая
                                        2020</span>
                                <div class="chat-item__badge ">
                                    <div
                                            class="chat-item__counter text text--size--smaller text--theme--label box box--center">
                                        2</div>
                                </div>
                            </a>
                        </li>
                        <% } %>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="chat-content dialogs__chat-content">
        <div class="chat-content__header">
            <div class="chat-content__avatar-wrap">
                <div class="avatar chat-content__avatar">
                    <div class="avatar__image">
                        <img class="image" src="img/avatar_placeholder.svg" alt="Avatar">
                    </div>
                </div>
            </div>
            <div class="text text--align--left text--size--small text--weight--bold avatar__title">Андрей</div>
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
                        <a class="dropdown__item" href="#add-user-popup">
                            <img class="image dropdown__image box box--round-border--circle" src="img/plus.svg"
                                 alt="Add member to chat">
                            <span class="text text--size--small">Добавить пользователя</span>
                        </a>
                    </li>
                    <li class="dropdown__item-wrap">
                        <a class="dropdown__item" href="#remove-user-popup">
                            <img class="image dropdown__image box box--round-border--circle" src="img/close.svg"
                                 alt="Delete member from chat">
                            <span class="text text--size--small">Удалить пользователя</span>
                        </a>
                    </li>
                    <li class="dropdown__item-wrap">
                        <a class="dropdown__item" href="#remove-chat-popup">
                            <img class="image dropdown__image box box--round-border--circle" src="img/close.svg"
                                 alt="Delete member from chat">
                            <span class="text text--size--small text--theme--danger">Удалить чат</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="history chat-content__history ">
            <div class="history__inner scroller">
                <div class="history__message-wrap">
                    <div
                            class="history__date-split text text--align--center text--size--smaller text--theme--label">
                        19 июня</div>
                </div>
                <div class="message history__message-wrap history__message-wrap--align--left">
                    <div class="message__text message__text--left">
                        <div class="text text--size--small">
                            Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то
                            момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
                            знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер
                            все
                            еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с
                            пленкой.

                            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они
                            так
                            никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на
                            аукционе за 45000 евро.
                        </div>
                        <div class="badge text text--theme--label text--size--tiny">11:56</div>
                    </div>
                </div>
                <div class="message history__message-wrap history__message-wrap--align--left">
                    <div class="message__photo">
                        <img class="image  box box--round-border--small" src="img/chat-image.png" alt="photo">
                        <div
                                class="badge text text--theme--light text--size--tiny box box--round-border--big box--background--label">
                            11:56</div>
                    </div>
                </div>
                <div class="history__message-wrap history__message-wrap--align--right">
                    <div class="message__text message__text--right text text--size--small">
                        <div class="text text--size--small">Круто!</div>
                        <div class="badge">
                            <img class="confirmation" src="img/confirmation_msg_read.svg"
                                 alt="Confirmation about message recieved and read">
                            <div class="timestamp text text--size--tiny text--theme--primary">11:56</div>
                        </div>
                    </div>
                </div>
                <div class="message history__message-wrap history__message-wrap--align--left">
                    <div class="message__text message__text--left">
                        <div class="text text--size--small">
                            Yeeeeeeh!
                        </div>
                        <div class="badge text text--theme--label text--size--tiny">11:56</div>
                    </div>
                </div>
                <div class="history__message-wrap history__message-wrap--align--right">
                    <div class="message__text message__text--right text text--size--small ">
                        <div class="text text--size--small">
                            А что было до:
                            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они
                            так
                            никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на
                            аукционе за 45000 евро.
                        </div>
                        <div class="badge">
                            <img class="confirmation" src="img/confirmation_msg_recieved.svg"
                                 alt="Confirmation about message recieved and read">
                            <div class="timestamp text text--size--tiny text--theme--primary">11:56</div>
                        </div>
                    </div>
                </div>
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

            <form class="form form--width--full">
                <input class="message-input" type="text" placeholder="Сообщение" value="" id="message"
                       name="message">
                <%~ it.slots.buttonSend.outerHTML %>
            </form>
        </div>
        <div class="chat-content__default">Выберите чат чтобы отправить сообщение</div>
    </div>
</main>

<div class="popup" id="add-user-popup">
    <a href="#" class="popup__close">&times;</a>
    <form class="form form--columns box box--round-border--small box--has-shadow box--center popup__inner">
        <h1 class="form__title text text--align--center">Добавить пользователя</h1>
        <div class="form__content">
           <%~ it.slots.login.outerHTML %>
        </div>
        <%~ it.slots.buttonAdd.outerHTML %>
    </form>
</div>

<div class="popup" id="remove-user-popup">
    <a href="#" class="popup__close">&times;</a>
    <form class="form form--columns box box--round-border--small box--has-shadow box--center popup__inner">
        <h1 class="form__title text text--align--center">Удалить пользователя</h1>
        <div class="form__content">
            <%~ it.slots.login.outerHTML %>
            
        </div>
        <%~ it.slots.buttonRemoveUser.outerHTML %>
    </form>
</div>

<div class="popup" id="remove-chat-popup">
    <a href="#" class="popup__close">&times;</a>
    <form class="form form--columns box box--round-border--small box--has-shadow box--center popup__inner">
        <h1 class="form__title text text--align--center">Удалить чат</h1>
        <div class="form__content">
            <div class="form__item">
                <label class="text text--size--small text--theme--label text--align--center">Вы уверены, что хотите
                    удалить данный чат?</label>
            </div>
        </div>
        <%~ it.slots.buttonRemoveChat.outerHTML %>
        <div class="form__link">
            <a class="link text--size--small text--theme--primary" href="#">Отмена</a>
        </div>
    </form>
</div>

`