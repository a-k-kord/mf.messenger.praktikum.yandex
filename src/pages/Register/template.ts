// eslint-disable-next-line import/no-default-export
export default `
<form class="form form--columns box box--round-border--small  box--has-shadow box--center">
    <h1 class="form__title text">Регистрация</h1>

    <div class="form__content">
            <%~ it.slots?.email.outerHTML %>
            <%~ it.slots?.login.outerHTML %>
            <%~ it.slots?.firstName.outerHTML %>
            <%~ it.slots?.secondName.outerHTML %>
            <%~ it.slots?.phone.outerHTML %>
            <%~ it.slots?.password.outerHTML %>
            <%~ it.slots?.passwordConfirm.outerHTML %>
    </div>

        <%~ it.slots?.button.outerHTML %>
        <%~ it.slots?.link.outerHTML %>
</form>
`;
