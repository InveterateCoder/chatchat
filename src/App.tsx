import React, { useEffect } from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Routes from './Routes'
import Error from './Error'
import getTheme from './theme'

function App() {
  const dark = useSelector((state) => state.dark)
  useEffect(() => {
    document.head.querySelector('meta[name="theme-color"]').content = dark ? '#212121' : '#f5f5f5'
  }, [dark])
  return (
    <ThemeProvider theme={getTheme(dark)}>
      <CssBaseline />
      <Routes />
      <Error />
    </ThemeProvider>
  )
}

export default App
