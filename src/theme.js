import { createMuiTheme } from '@material-ui/core'

function getTheme(dark) {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: dark ? 'dark' : 'light',
    },
    drawerWidth: 270,
    baseShiftTop: 55,
  })
}

export default getTheme
