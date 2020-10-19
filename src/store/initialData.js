import memory from './memory'
import { dType } from './actions'

const initialData = {
  dark: memory.dark,
  dtype: dType.temporary,
  dopen: false,
  creds: memory.creds,
  sopen: false,
}

export default initialData
