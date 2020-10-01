import React, { useMemo, useState } from 'react'
import { ThemeProvider } from '@material-ui/core'
import Routes from './Routes.jsx'
import getTheme from './theme'

export default function App() {
  const [dark, setDark] = useState(localStorage.getItem('dark'))
  const theme = useMemo(() => getTheme(dark), [dark])
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}
