import React, { useMemo, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import Main from './Main.jsx'
import getTheme from './theme'

export default function App() {
  const [dark, setDark] = useState(localStorage.getItem('dark'))
  const theme = useMemo(() => getTheme(dark), [dark])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  )
}
