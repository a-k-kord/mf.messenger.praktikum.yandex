const SERVER_ERRORS = {
    'Login or password is incorrect': 'Неверный логин или пароль',
    'user already in system': 'Пользователь уже в системе',
    'timeout': 'Таймаут запроса. Попробуйте еще раз'
}

export function getRussianErrorMsg(msgEng) {
    return SERVER_ERRORS[msgEng] ?? msgEng;
}