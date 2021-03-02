export default `
<main class="profile">
  <aside class="profile__nav-back">
    <%~ it.slots.linkBack.outerHTML %>
  </aside>
  <form class="form form--columns profile__form">
    <div class="avatar profile__avatar">
      <div class="avatar__image form__avatar">
        <%~ it.slots.avatar.outerHTML %>
        <%~ it.slots.linkAvatarUpload.outerHTML %>
      </div>
    </div>
    <%~ it.slots.userNameLabel.outerHTML %>

    <div class="form__content box box--margin-y--60">
        <%~ it.slots.email.outerHTML %>
        <%~ it.slots.login.outerHTML %>
        <%~ it.slots.firstName.outerHTML %>
        <%~ it.slots.secondName.outerHTML %>
        <%~ it.slots.displayName.outerHTML %>
        <%~ it.slots.phone.outerHTML %>
        <%~ it.slots.oldPassword.outerHTML %>
        <%~ it.slots.password.outerHTML %>
        <%~ it.slots.passwordConfirm.outerHTML %>
    </div>
    <div class="profile__footer">
        <%~ it.slots.linkProfileEdit.outerHTML %>
        <%~ it.slots.linkChangePassword.outerHTML %>
        <%~ it.slots.linkLogout.outerHTML %>
        <%~ it.slots.buttonSave.outerHTML %>
        <%~ it.slots.linkCancelSave.outerHTML %>
        <%~ it.slots.buttonSavePassword.outerHTML %>
        <%~ it.slots.linkCancelSavePassword.outerHTML %>
    </div>
  </form>
</main>

<div class="popup" id="change-avatar-popup" style="display:none">
  <%~ it.slots.linkCloseChangeAvatarPopup.outerHTML %>
  <form class="form form--columns uploaded box box--round-border--small box--has-shadow box--center popup__inner">
    <h1 class="form__title text text--align--center">Загрузите файл</h1>
    <div class="uploaded__error text text--theme--danger form__error-msg--hidden">Ошибка, попробуйте ещё раз</div>
    <div class="form__content">
      <div class="form__item">
        <label class="text text--size--small text--theme--primary text--align--center link--with--underline box--as--block box--width--150 box--margin--auto">
          <%~ it.slots.avatarUpload.outerHTML %>
          <a>Выбрать файл на компьютере</a>
        </label>
        <div class="uploaded__file-name text text--size--small text--theme--label text--align--center" hidden> No File</div>
      </div>
    </div>
    <%~ it.slots.buttonChangeAvatar.outerHTML %>
    <%~ it.slots.avatarUploadError.outerHTML %>
  </form>
</div>
`