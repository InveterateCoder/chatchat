import { createMuiTheme, ThemeOptions } from '@material-ui/core'

interface MyTheme extends ThemeOptions {
  drawerMaxWidth: string | number,
  drawerWidth: string | number,
  baseShiftTop: string | number,
  baseShiftBottom: string | number,
}


function getTheme(dark: boolean) {
  const theme: MyTheme = {
    palette: {
      type: dark ? 'dark' : 'light',
    },
    drawerMaxWidth: 360,
    drawerWidth: '80%',
    baseShiftTop: 50,
    baseShiftBottom: 70,
  }
  return createMuiTheme(theme)
}

export default getTheme
