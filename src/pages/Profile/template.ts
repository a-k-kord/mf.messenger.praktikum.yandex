export default `
<main class="profile">
  <aside class="profile__nav-back">
    <%~ it.slots.linkBack.outerHTML %>
  </aside>
  <form class="form form--columns profile__form">
    <div class="avatar profile__avatar">
      <div class="avatar__image form__avatar">
        <img class="image" src="img/avatar_placeholder.svg" alt="Avatar">
        <%~ it.slots.linkAvatarUpload.outerHTML %>
      </div>
    </div>
    <div class="text text--align--center text--weight--bold profile__title">Иван</div>

    <div class="form__content box box--margin-y--60">
        <%~ it.slots.email.outerHTML %>
        <%~ it.slots.login.outerHTML %>
        <%~ it.slots.firstName.outerHTML %>
        <%~ it.slots.secondName.outerHTML %>
        <%~ it.slots.displayName.outerHTML %>
        <%~ it.slots.phone.outerHTML %>
        <%~ it.slots.oldPassword.outerHTML %>
        <%~ it.slots.newPassword.outerHTML %>
        <%~ it.slots.newPasswordConfirm.outerHTML %>
    </div>
    <div class="profile__footer">
        <%~ it.slots.linkProfileEdit.outerHTML %>
        <%~ it.slots.linkChangePassword.outerHTML %>
        <%~ it.slots.linkLogout.outerHTML %>
        <%~ it.slots.buttonSave.outerHTML %>
    </div>
  </form>
</main>

<div class="popup" id="change-avatar-popup">
  <a href="#" class="popup__close">&times;</a>
  <form class="form form--columns uploaded box box--round-border--small box--has-shadow box--center popup__inner">
    <h1 class="form__title text text--align--center">Загрузите файл</h1>
    <div class="uploaded__error text text--theme--danger form__error-msg--hidden">Ошибка, попробуйте ещё раз</div>
    <div class="form__content">
      <div class="form__item">
        <label class="text text--size--small text--theme--primary text--align--center link--with--underline box--as--block box--width--150 box--margin--auto">
          <input type="file" style="display: none;"  id="avatar" name="avatar" onchange="setUploadedFileName(this, '.uploaded__file-name', '.uploaded__error')">
          <a>Выбрать файл на компьютере</a>
        </label>
        <div class="uploaded__file-name text text--size--small text--theme--label text--align--center" hidden> No File</div>
      </div>
    </div>
    <div class="form__button">
      <button
              class="text text--theme--light text--size--small text--weight--bold button button__text"  type="submit"  formmethod="POST">Поменять</button>
    </div>
    <div class="text text--size--small text--theme--danger form__error-msg--hidden">Нужно выбрать файл</div>
  </form>
</div>
`