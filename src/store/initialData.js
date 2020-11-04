import memory from './memory'
import { dType, themeType } from './types'

function getDark() {
  if (memory.theme === themeType.auto) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return memory.theme === themeType.dark
}

const initialData = {
  error: {
    message: '',
    open: false,
  },
  theme: memory.theme,
  dark: getDark(), // dark mode
  dtype: dType.temporary, // drawer type
  dopen: true, // drawer open state
  signup: false, // weather to sign up or in
  creds: memory.creds, // user credentials
  sopen: false, // settings open state
  avatar: {
    url: '',
    open: false,
  },
  refava: Math.random().toString(), // refresh avatars by appending random data to the URLs
}

export default initialData
