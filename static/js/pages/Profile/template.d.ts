declare const _default: "\n<main class=\"profile\">\n  <aside class=\"profile__nav-back\">\n    <%~ it.slots?.linkBack.outerHTML %>\n  </aside>\n  <form class=\"form form--columns profile__form\">\n    <div class=\"avatar profile__avatar\">\n      <div class=\"avatar__image form__avatar\">\n        <%~ it.slots?.avatar.outerHTML %>\n        <%~ it.slots?.linkAvatarUpload.outerHTML %>\n      </div>\n    </div>\n    <%~ it.slots?.userNameLabel.outerHTML %>\n\n    <div class=\"form__content box box--margin-y--60\">\n        <%~ it.slots?.email.outerHTML %>\n        <%~ it.slots?.login.outerHTML %>\n        <%~ it.slots?.firstName.outerHTML %>\n        <%~ it.slots?.secondName.outerHTML %>\n        <%~ it.slots?.displayName.outerHTML %>\n        <%~ it.slots?.phone.outerHTML %>\n        <%~ it.slots?.oldPassword.outerHTML %>\n        <%~ it.slots?.password.outerHTML %>\n        <%~ it.slots?.passwordConfirm.outerHTML %>\n    </div>\n    <div class=\"profile__footer\">\n        <%~ it.slots?.linkProfileEdit.outerHTML %>\n        <%~ it.slots?.linkChangePassword.outerHTML %>\n        <%~ it.slots?.linkLogout.outerHTML %>\n        <%~ it.slots?.buttonSave.outerHTML %>\n        <%~ it.slots?.linkCancelSave.outerHTML %>\n        <%~ it.slots?.buttonSavePassword.outerHTML %>\n        <%~ it.slots?.linkCancelSavePassword.outerHTML %>\n    </div>\n  </form>\n</main>\n\n<div class=\"popup\" id=\"change-avatar-popup\" style=\"display:none\">\n  <%~ it.slots?.linkCloseChangeAvatarPopup.outerHTML %>\n  <form class=\"form form--columns uploaded box box--round-border--small box--has-shadow box--center popup__inner\">\n    <h1 class=\"form__title text text--align--center\">Загрузите файл</h1>\n    <div class=\"uploaded__error text text--theme--danger form__error-msg--hidden\">Ошибка, попробуйте ещё раз</div>\n    <div class=\"form__content\">\n      <div class=\"form__item\">\n        <label class=\"text text--size--small text--theme--primary text--align--center link--with--underline box--as--block box--width--150 box--margin--auto\">\n          <%~ it.slots?.avatarUpload.outerHTML %>\n          <a>Выбрать файл на компьютере</a>\n        </label>\n        <div class=\"uploaded__file-name text text--size--small text--theme--label text--align--center\" hidden> No File</div>\n      </div>\n    </div>\n    <%~ it.slots?.buttonChangeAvatar.outerHTML %>\n    <%~ it.slots?.avatarUploadError.outerHTML %>\n  </form>\n</div>\n";
export default _default;
