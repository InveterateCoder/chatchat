import memory from './memory'
import { dType, themeType, Store} from '../../interfaces/storeTypes'

function getDark() {
  if (memory.theme === themeType.auto) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return memory.theme === themeType.dark
}

const initialData: Store = {
  id: '',
  nick: '',
  url: '',
  error: {
    message: '',
    open: false,
  },
  conFailed: false,
  theme: memory.theme,
  dark: getDark(),
  dtype: dType.temporary,
  dopen: true,
  signup: false,
  token: memory.token,
  sopen: false,
  avatar: {
    url: '',
    open: false,
  },
}

export default initialData
