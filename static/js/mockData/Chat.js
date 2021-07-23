export var mockChatData = {
    userName: 'Андрей Длинноимянный',
    unreadCount: 2,
    message: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать совсем',
    messageDate: '10 Мая 2020',
    mes1: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    mes2: 'Круто!',
    mes3: 'Yeeeeeeh!',
    mes4: 'А что было до: Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    mesTime: '11:56',
    mesDay: '19 июня',
};
export var mockUser = {
    id: 123,
    first_name: 'Petya',
    second_name: 'Pupkin',
    display_name: 'Petya Pupkin',
    login: 'userLogin',
    email: 'my@email.com',
    phone: '89223332211',
    avatar: '/path/to/avatar.jpg',
};
export var mockChats = [
    {
        id: 123,
        title: 'my-chat',
        avatar: '/123/avatar1.jpg',
        unread_count: 15,
        last_message: {
            user: {
                first_name: 'Petya',
                second_name: 'Pupkin',
                avatar: '/path/to/avatar.jpg',
                email: 'my@email.com',
                login: 'userLogin',
                phone: '8(911)-222-33-22',
            },
            time: '2020-01-02T14:22:22.000Z',
            content: 'this is message content',
        },
    },
];
