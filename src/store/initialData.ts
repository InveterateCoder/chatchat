import memory from './memory'
import { dType, themeType, Store} from './types'

function getDark() {
  if (memory.theme === themeType.auto) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return memory.theme === themeType.dark
}

const initialData: Store = {
  error: {
    message: '',
    open: false,
  },
  theme: memory.theme,
  dark: getDark(),
  dtype: dType.temporary,
  dopen: true,
  signup: false,
  token: memory.token,
  auth: memory.auth,
  sopen: false,
  avatar: {
    url: '',
    open: false,
  },
  refava: Math.random().toString(),
}

export default initialData
