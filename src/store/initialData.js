import memory from './memory'
import { dType } from './actions'

const initialData = {
  dark: memory.dark,
  dtype: dType.temporary,
  dopen: false,
  sign: 'in',
  token: memory.token,
}

export default initialData
