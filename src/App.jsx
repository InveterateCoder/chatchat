import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Routes from './Routes.jsx'
import getTheme from './theme'

function App() {
  const dark = useSelector((state) => state.dark)
  useEffect(() => {
    document.head.querySelector('meta[name="theme-color"]').content = dark ? '#212121' : '#f5f5f5'
  }, [dark])
  return (
    <ThemeProvider theme={getTheme(dark)}>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  )
}

export default App
