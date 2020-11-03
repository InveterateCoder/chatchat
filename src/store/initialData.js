import memory from './memory'
import { dType } from './actions'

const initialData = {
  error: {
    message: '',
    open: false,
  },
  dark: memory.dark, // dark mode
  dtype: dType.temporary, // drawer type
  dopen: true, // drawer open state
  signup: false, // weather to sign up or in
  creds: memory.creds, // user credentials
  sopen: false, // settings open state
  refava: Math.random().toString(), // refresh avatars by appending random data to the URLs
}

export default initialData
