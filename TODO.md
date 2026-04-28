# Connection Plan for login_register.js

## login.html
- [ ] Add `id="btn-text"` to the submit button
- [ ] Add `onsubmit="event.preventDefault(); login();"` to the `<form>` tag
- [ ] Include `<script src="login_register.js"></script>` before `</body>`

## register.html
- [ ] Change submit button `id` from `submitButton` to `btn-text`
- [ ] Update inline reCAPTCHA script to reference `btn-text` instead of `submitButton`
- [ ] Modify the form submit listener to call `register()` after reCAPTCHA validation
- [ ] Include `<script src="login_register.js"></script>` before `</body>`

