var SERVER_ERRORS = {
    'Login or password is incorrect': 'Неверный логин или пароль',
    'user already in system': 'Пользователь уже в системе',
    'timeout': 'Таймаут запроса. Попробуйте еще раз'
};
export function getRussianErrorMsg(msgEng) {
    var _a;
    return (_a = SERVER_ERRORS[msgEng]) !== null && _a !== void 0 ? _a : msgEng;
}
