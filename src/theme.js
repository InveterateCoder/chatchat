import { createMuiTheme } from '@material-ui/core'

function getTheme(dark) {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: dark ? 'dark' : 'light',
    },
    drawerMaxWidth: 360,
    drawerWidth: '80%',
    baseShiftTop: 50,
    baseShiftBottom: 70,
  })
}

export default getTheme
