export interface SignInErrors {
  [key: string]: string,
  nick: string,
  password: string,
}

export interface SignUpErrors {
  [key: string]: string,
  nick: string,
  password: string,
  confirm: string,
  image: string,
}

export interface ChangeUserErrors {
  [key: string]: string,
  nick: string,
  image: string,
}

export function validateNick(nick: string) {
  if (nick.length < 3) {
    return 'Nickname must be at least 3 characters long.'
  }
  if (nick.length > 40) {
    return 'Nickname must not be more than 40 characters long.'
  }
  return ''
}

export function validatePassword(password: string) {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.'
  }
  if (password.length > 128) {
    return 'Password\'s length exceeds 128 characters.'
  }
  return ''
}

export function validateImageExist(image: File | null) {
  if (!image || !image.size) {
    return 'Avatar is required. Please select a picture.'
  }
  return ''
}

export function validateImageType(image: File | null) {
  if (image && image.size && !['image/png', 'image/jpeg'].includes(image.type)) {
    return 'Wrong image type.'
  }
  return ''
}

export const validateSignUpForm = ({
  nick, password, confirm, image,
}: { nick: string, password: string, confirm: string, image: File | null }) => {
  const errors: SignUpErrors = {
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
  errors.image = validateImageExist(image)
  if (!errors.image) errors.image = validateImageType(image)

  return {
    valid: !(errors.nick || errors.password || errors.confirm || errors.image),
    errors,
  }
}

export const validateSignInForm = ({ nick, password }: SignInErrors) => {
  const errors: SignInErrors = {
    nick: '',
    password: '',
  }
  errors.nick = validateNick(nick)
  errors.password = validatePassword(password)

  return {
    valid: !(errors.nick || errors.password),
    errors,
  }
}

export const validateChangeUserForm = ({ nick, image }: { nick: string, image: File | null }) => {
  const errors: ChangeUserErrors = {
    nick: '',
    image: '',
  }
  errors.nick = validateNick(nick)
  errors.image = validateImageType(image)

  return {
    valid: !(errors.nick || errors.image),
    errors,
  }
}
