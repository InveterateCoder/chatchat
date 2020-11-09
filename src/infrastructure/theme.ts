import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core'

interface MyProps {
  drawerMaxWidth: number,
  drawerWidth: string,
  baseShiftTop: number,
  baseShiftBottom: number,
}

export interface MyTheme extends MyProps, Theme {}

interface MyThemeOptions extends MyProps, ThemeOptions {}

function getTheme(dark: boolean) {
  const opts: MyThemeOptions = {
    palette: {
      type: dark ? 'dark' : 'light',
    },
    drawerMaxWidth: 360,
    drawerWidth: '80%',
    baseShiftTop: 50,
    baseShiftBottom: 70,
  }
  return createMuiTheme(opts)
}

export default getTheme
