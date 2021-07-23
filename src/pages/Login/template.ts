// eslint-disable-next-line import/no-default-export
export default `
<form class="form form--columns box box--round-border--small  box--has-shadow box--center">
    <h1 class="form__title text">Вход</h1>
    <div class="form__content form__content--with-min-height">
            <%~ it.slots?.login.outerHTML %>
            <%~ it.slots?.password.outerHTML %>
    </div>
        <%~ it.slots?.button.outerHTML %>
        <%~ it.slots?.link.outerHTML %>
</form>
`;
