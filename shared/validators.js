/* eslint-disable import/prefer-default-export */
export const validateSignUpForm = ({
  nick, password, confirm, image,
}) => {
  const errors = {
    nick: '',
    password: '',
    confirm: '',
    image: '',
  }
  if (nick.length < 3 || nick.length > 40) {
    errors.nick = 'Nickname must be from 3 to 40 characters long'
  }
  if (password.length < 6) {
    errors.password = 'Password must be minimum 6 characters long'
  }
  if (password.length > 128) {
    errors.password = 'Password\'s length exceeds 128 characters'
  }
  if (!errors.password && password !== confirm) {
    errors.confirm = 'Failed to confirm, passwords do not match'
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
