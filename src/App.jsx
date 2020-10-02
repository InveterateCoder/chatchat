import React from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Home from './Home.jsx'
import getTheme from './theme'

// eslint-disable-next-line react/prop-types
function App() {
  const theme = useSelector(({ dark }) => getTheme(dark))
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  )
}

export default App
