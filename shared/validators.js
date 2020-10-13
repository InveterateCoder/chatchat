function validateNick(nick) {
  if (nick.length < 3) {
    return 'Nickname must be at least 3 characters long.'
  }
  if (nick.length > 40) {
    return 'Nickname must not be more than 40 characters long.'
  }
  return ''
}

function validatePassword(password) {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.'
  }
  if (password.length > 128) {
    return 'Password\'s length exceeds 128 characters.'
  }
  return ''
}

export const validateSignUpForm = ({
  nick, password, confirm, image,
}) => {
  const errors = {
    nick: '',
    password: '',
    confirm: '',
    image: '',
  }
  errors.nick = validateNick(nick)
  errors.password = validatePassword(password)

  if (!errors.password && password !== confirm) {
    errors.confirm = 'Failed to confirm, passwords do not match.'
  }
  if (!image || !image.size) {
    errors.image = 'Avatar is required. Please select a picture.'
  }
  if (errors.nick || errors.password || errors.confirm || errors.image) {
    return {
      valid: false,
      errors,
    }
  }
  return {
    valid: true,
  }
}

export const validateSignInForm = ({ nick, password }) => {
  const errors = {
    nick: '',
    password: '',
  }
  errors.nick = validateNick(nick)
  errors.password = validatePassword(password)

  if (errors.nick || errors.password) {
    return {
      valid: false,
      errors,
    }
  }
  return {
    valid: true,
  }
}
