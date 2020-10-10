import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Routes from './Routes.jsx'
import getTheme from './theme'

// eslint-disable-next-line react/prop-types
function App() {
  const theme = useSelector(({ dark }) => getTheme(dark))
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  )
}

export default App
