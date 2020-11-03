import { createMuiTheme } from '@material-ui/core'

function getTheme(dark) {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: dark ? 'dark' : 'light',
    },
    drawerMaxWidth: 330,
    drawerWidth: '80%',
    baseShiftTop: 50,
    baseShiftBottom: 65,
  })
}

export default getTheme
